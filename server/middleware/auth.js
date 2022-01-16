export function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  }

export function ensureGuest (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      console.log('auth?')
      res.redirect('/mine');
    }
  }
