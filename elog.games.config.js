module.exports = {
  write: {
    platform: 'yuque',
    yuque: {
      token: process.env.YUQUE_TOKEN,
      login: 'huanshishuijuegenghao',
      repo: 'brfy2e',
      onlyPublic: false,
      onlyPublished: false,
      limit: 1,
    },
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './games',
      filename: 'title',
      format: 'markdown',
      catalog: true,
    },
  },
  image: {
    enable: true,
    platform: 'local',
    local: {
      outputDir: './games/images',
      prefixKey: '/images',
      pathFollowDoc: false,
    },
  },
}
