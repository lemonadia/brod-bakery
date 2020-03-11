const spaceID = "6kppi1br4ten";
const environmentId = "master";
const accessToken = "qLz4ipkPPD7nloNSAd9fi0p1dnF90jvd0WDBh5jlxdI";

// we are going to make url with this three things

const url = `https://cdn.contentful.com/spaces/${spaceID}/environments/${environmentId}/entries?access_token=${accessToken}`;

const sectionTag = document.querySelector("section.grid");

const grabData = function() {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      //store the assets somewhere
      const assets = data.includes.Asset;
      // turn our contentful data into sth more useful

      return data.items.map(item => {
        let imageUrl = "assets/bread3.jpg";

        const imageId = item.fields.image.sys.id;

        const imageData = assets.find(asset => {
          return asset.sys.id == imageId;
        });

        if (imageData) {
          imageUrl = imageData.fields.file.url;
        }

        item.fields.image = imageUrl;
        return item.fields;
      });
    });
};

grabData().then(data => {
  //in here do sth with returned data
  console.log(data);

  //remove the loader
  sectionTag.innerHTML = "";

  data.forEach(item => {
    sectionTag.innerHTML =
      sectionTag.innerHTML +
      `
     <div class="item">
      <img src="${item.image}">
      <div class="title">
       <h2>${item.name}</h2>
       <p>${item.price}</p>
      </div>
      <p>${item.usage}</p>
     </div>
    `;
  });
});
