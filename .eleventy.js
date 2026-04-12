const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("*.ico");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.txt");
  eleventyConfig.addPassthroughCopy("*.xml");
  eleventyConfig.addPassthroughCopy("*.html");

  const md = require("markdown-it")({ html: true });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_posts/*.md");
  });

  eleventyConfig.addFilter("fechaEs", function(date) {
    return DateTime.fromJSDate(new Date(date), { zone: "UTC" })
      .setLocale("es")
      .toFormat("d 'de' LLLL 'de' yyyy");
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk"]
  };
};
