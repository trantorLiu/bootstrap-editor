# bootstrap-editor

bootstrap-editor extends [bootstrap-wysihtml5](https://github.com/jhollingworth/bootstrap-wysihtml5) with image upload feature by using [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload).

## Running the Exmaple

```bash
git clone git@github.com:trantorLiu/bootstrap-editor.git
cd bootstrap-editor

# Setup the server side. See the **Server** section below for more info.
mkdir node_modules
npm install blueimp-file-upload-node
./node_modules/blueimp-file-upload-node/server.js

# Then open bootstrap-editor/index.html with your browser.
```

## Demo
**Currently, there's no server-side support for the demo page.**
It only shows you what the editor looks like.
But you can imagine that with the server-side support, after choosing an image, it will be pasted to the textarea.

http://trantorliu.github.io/bootstrap-editor


## Files to reference
```html
<script src="lib/js/wysihtml5-0.3.0.js"></script>
<script src="lib/js/jquery-1.7.2.min.js"></script>
<script src="lib/js/prettify.js"></script>
<script src="lib/js/bootstrap.min.js"></script>
<script src="lib/js/bootstrap-wysihtml5.js"></script>
<script src="lib/js/jquery.ui.widget.js"></script>
<script src="lib/js/jquery.iframe-transport.js"></script>
<script src="lib/js/jquery.fileupload.js"></script>
<script src="src/bootstrap-editor.js"></script>
```

## Usage


```javascript
$('.textarea').bootstrapEditor({
  fileupload: {
    url: 'http://localhost:8888',
    dataType: 'json',
    done: function(e, data) {
      var imgs = [];
      $.each(data.result.files, function(index, file) {
        imgs.push({
          src: file.url,
          alt: file.name
        });
      });
      return imgs;
    }
  }
});
```

Init the editor with the `fileupload` options. See [jQuery-File-Upload's Wiki](https://github.com/blueimp/jQuery-File-Upload/wiki/Options) for more details.

The `done` callback should return an object or an array of objects with the following format:

```javascript
{
  src: '/path/to/the/image',
  alt: 'some alt text'    // optional
}
```

All other options are same as [bootstrap-wysihtml5](https://github.com/jhollingworth/bootstrap-wysihtml5/).

## Server

There are some server side support avaliable on https://github.com/blueimp/jQuery-File-Upload/wiki/Setup.

For example, node users can simply type:

```bash
npm install blueimp-file-upload-node
./node_modules/blueimp-file-upload-node/server.js
```

## License

MIT
