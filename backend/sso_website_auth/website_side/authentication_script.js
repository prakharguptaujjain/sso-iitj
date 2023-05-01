function verifyUser(token, callback) {
    $.ajax({
      url: 'http://auth-server.com/verify',
      data: {
        website_token: token,
        user_token: token_from_cookie,
        username : username_from_cookie
      },
    });
  }
  