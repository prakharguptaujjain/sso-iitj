function verifyUser(token, callback) {
    $.ajax({
      url: 'http://auth-server.com/verify',
      data: {
        site_token: token,
        user_token: token_from_cookie
      },
    });
  }
  