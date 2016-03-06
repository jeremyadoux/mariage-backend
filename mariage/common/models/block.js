module.exports = function(Block) {
  Block.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    req.body.contributorId = req.accessToken.userId;
    next();
  });
};
