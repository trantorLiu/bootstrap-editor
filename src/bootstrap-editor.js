!function($) {

  var fileuploadOptions = {};
  var wysihtml5Overrides = {
    initInsertImage: function(toolbar) {
      var self = this;
      var insertImageModal = toolbar.find('.bootstrap-wysihtml5-insert-image-modal');
      var urlInput = insertImageModal.find('.bootstrap-wysihtml5-insert-image-url');
      var insertButton = insertImageModal.find('a.btn-primary');
      var initialValue = urlInput.val();

      var insertImage = function(imgData) {
        if (!imgData.src) throw 'Image src is not specified';
        self.editor.currentView.element.focus();
        self.editor.composer.commands.exec("insertImage", imgData);
      };

      insertImageModal.on('hide', function() {
        self.editor.currentView.element.focus();
      });

      toolbar.find('a[data-wysihtml5-command=insertImage]').click(function() {
        var activeButton = $(this).hasClass("wysihtml5-command-active");
        var done;

        if (!activeButton) {
          insertImageModal.modal('show');

          done = function(e, data) {
            var imgs;

            // Trigger the `done` callback in the `fileuplaod` option.
            // `done` should return an object or an array of objects with the following format:
            // {
            //   src: 'img src',
            //   alt: 'img alt'  // optional
            // }
            imgs = fileuploadOptions.done(e, data);

            if (!$.isArray(imgs)) imgs = [imgs];

            insertImageModal.modal('hide');
            $.each(imgs, function(index, img) {
              insertImage(img);
            });
          };

          insertImageModal.find('.file').fileupload($.extend({}, fileuploadOptions, {
            done: done
          }));

          return false;
        }
        else {
          return true;
        }
      });
    }
  };

  $.extend($.fn.wysihtml5.Constructor.prototype, wysihtml5Overrides);

  // Override options.
  var wysihtml5Options = {
    customTemplates: {
      /* This is the template for the image button in the toolbar. */
      image: function(locale) {
        return '<li>' +
          '<div class="bootstrap-wysihtml5-insert-image-modal modal hide">' +
          '<div class="modal-header">' +
          '<a class="close" data-dismiss="modal">&times;</a>' +
          '<h3>' + locale.image.insert + '</h3>' +
          '</div>' +
          '<div class="modal-body">' +
          '<input name="file" class="file" type="file" multiple>' +
          '</div>' +
          '<div class="modal-footer">' +
          '<button class="btn" data-dismiss="modal">' + locale.image.cancel + '</button>' +
          '</div>' +
          '</div>' +
          '<a class="btn" data-wysihtml5-command="insertImage" title="' + locale.image.insert + '"><i class="icon-picture"></i></a>' +
          '</li>';
      }
    },
  };

  $.fn.bootstrapEditor = function(options) {
    if (options && options.image !== false && options.fileupload) {
      fileuploadOptions = options.fileupload;
    }
    $(this).wysihtml5($.extend(wysihtml5Options, options));
  };

}(window.jQuery);
