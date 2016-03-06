module.exports = function(Comment) {
  Comment.beforeRemote('create', function (context, user, next) {
    var req = context.req;
    req.body.created = Date.now();
    next();
  });
};
