import ldap
from django.conf import settings as django_settings

LDAP_ERRORS = {
    0: 'Success!',
    1: 'LDAP server is down.',
    2: 'You are not authorized to access this account.',
    3: 'Invalid user credentials.',
    4: 'Account inactivated. Contact system administrator.',
    5: 'An error occurred while logging in. Please try again.'
}


class LDAPAuth:
    def __init__(self):
        self.ldap_server = django_settings.LDAP_SERVER
        self.searchdn = django_settings.LDAP_SEARCHDN
        self.searchpw = django_settings.LDAP_SEARCHPW
        self.basedn = django_settings.LDAP_BASEDN

    def ldap_get_dn_data(self, username):
        try:
            ldap_conn = ldap.initialize(self.ldap_server)
        except ldap.SERVER_DOWN:
            print(LDAP_ERRORS[1])
            return None, 1

        try:
            ldap_conn.simple_bind_s(self.searchdn, self.searchpw)
        except ldap.INVALID_CREDENTIALS:
            print("Invalid search credentials")
            return None, 2
        except ldap.LDAPError as e:
            print(e)
            return None, 5

        ldap_attributes = ["sn", "mail", "uid", "entrydn", "givenName"]
        search_scope = ldap.SCOPE_SUBTREE

        try:
            ldap_result_id = ldap_conn.search(
                self.basedn, search_scope, f"uid={username}", ldap_attributes)
            result_set = []

            while 1:
                result_type, result_data = ldap_conn.result(ldap_result_id, 0)

                if result_data == []:
                    break
                else:
                    if result_type == ldap.RES_SEARCH_ENTRY:
                        result_set.append(result_data)

            if result_set == []:
                return None, 5

            result_set = result_set[0][0][1]

            data = {
                "name": result_set['givenName'][0].decode('utf-8'),
                "roll_no": result_set['sn'][0].decode('utf-8')[1:-1],
                "mail": result_set['mail'][0].decode('utf-8'),
                "username": result_set['uid'][0].decode('utf-8'),
                "dn": result_set['entrydn'][0].decode('utf-8')
            }

            return data, 0
        except ldap.LDAPError as e:
            print(e)
            return None, 5

    def ldap_auth(self, username, password):
        data, err = self.ldap_get_dn_data(username)

        if data is None:
            return None, err

        dn = data['dn']

        try:
            ldap_conn = ldap.initialize(self.ldap_server)
        except ldap.SERVER_DOWN:
            print(LDAP_ERRORS[1])
            return None, 1

        try:
            ldap_conn.simple_bind_s(dn, password)
            del data["dn"]
            return data, 0
        except ldap.INVALID_CREDENTIALS:
            print(LDAP_ERRORS[3])
            return None, 3
        except ldap.UNWILLING_TO_PERFORM:
            print(LDAP_ERRORS[4])
            return None, 4
        except ldap.LDAPError as e:
            print(e)
            return None, 5

    def authenticate(self, username, password):
        return self.ldap_auth(username, password)
