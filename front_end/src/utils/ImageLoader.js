// src/utils/ImageLoader.js

export class ImageLoader {
    static loadImagesFromContext(context) {
      return context.keys().reduce((acc, path) => {
        const fileName = path.split('/').pop(); // "1.jpg" hoặc "abc.png"
        acc[fileName] = context(path);
        return acc;
      }, {});
    }
  
    static load() {
      const context = require.context('../assets/img/products', true, /\.png$/);
      return ImageLoader.loadImagesFromContext(context);
    }
  }