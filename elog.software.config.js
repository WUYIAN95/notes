module.exports = {
  write: {
    platform: 'yuque',
    yuque: {
      token: process.env.YUQUE_TOKEN,
      login: 'huanshishuijuegenghao',
      repo: 'bgx4ge',
      onlyPublic: false,
      onlyPublished: false,
      limit: 1,
    },
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './software',
      filename: 'title',
      format: 'markdown',
      catalog: true,
    },
  },
  image: {
    enable: true,
    platform: 'local',
    local: {
      outputDir: './software/images',
      prefixKey: '/images',
      pathFollowDoc: false,
    },
  },
}
