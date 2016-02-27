var CONTAINERS_URL = '/api/containers/';
var CONTAINER_COMMON = 'common';
module.exports = function(File) {

  File.upload = function (ctx,options,cb) {
    if(!options) options = {};
    ctx.req.params.container = CONTAINER_COMMON;
    File.app.models.container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
      if(err) {
        cb(err);
      } else {
        if (!fileObj.files || !fileObj.files.file || !fileObj.files.file[0]){
          cb("Must defined a file element");
        } else {
          var fileInfo = fileObj.files.file[0];
          File.create({
            name: fileInfo.name,
            type: fileInfo.type,
            container: fileInfo.container,
            url: CONTAINERS_URL + fileInfo.container + '/download/' + fileInfo.name
          }, function (err, obj) {
            if (err !== null) {
              cb(err);
            } else {
              cb(null, obj);
            }
          });
        }
      }
    });
  };

  File.download = function(ctx, res, req, width, height, id, cb) {
    //Load File if exist
    File.findById(id, function(err, fileObj) {
      if(err) {
        cb(err);
      } else {
        return File.app.models.container.download('common', fileObj.name, req, res, cb);


        /*
         if(!width) {
         width = false;
         height = false;
         } else {
         if (!height) {
         var transformedFileName = width + "-" + file;
         } else {
         var transformedFileName = width + "-" + height + "-" + file;
         }

         File.app.models.container.getFile('common', transformedFileName, function (err, fileObj) {
         if (err) {
         File.app.models.container.getFile('common', file, function (err, fileObj) {
         if (err) {
         cb(err);
         } else {
         var fs = require('fs')
         , gm = require('gm');

         gm('./server/storage/common/'+file)
         .resize(width, height)
         .write('./server/storage/common/'+transformedFileName, function (err) {
         if (err) {
         cb(err);
         } else {
         return File.app.models.container.download('common', transformedFileName, res, cb);
         }
         });
         }
         });
         } else {
         return File.app.models.container.download('common', transformedFileName, res, cb);
         }
         });
         }*/
      }
    });
  };

  File.remoteMethod(
    'upload',
    {
      description: 'Uploads a file',
      accepts: [
        { arg: 'ctx', type: 'object', http: { source:'context' } },
        { arg: 'options', type: 'object', http:{ source: 'query'} }
      ],
      returns: {
        arg: 'fileObject', type: 'object', root: true
      },
      http: {verb: 'post'}
    }
  );

  File.remoteMethod(
    'download',
    {
      description: 'download a file',
      accepts: [
        { arg: 'ctx', type: 'object', http: { source:'context' } },
        { arg: 'res', type: 'object', http: { source:'res' } },
        { arg: 'req', type: 'object', 'http': {source: 'req' }},
        { arg: 'width', type: 'Number', http:{ source: 'query'} },
        { arg: 'height', type: 'Number', http:{ source: 'query'} },
        {arg: 'id', type: 'String', required: true}
      ],
      returns: {},
      http: {path: '/download/:id', verb: 'get'}
    }
  );
};
