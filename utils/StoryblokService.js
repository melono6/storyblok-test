import StoryblokClient from 'storyblok-js-client'

class StoryblokService {
  constructor() {
    this.devMode = false // If true it always loads draft
    this.token = 'Vu7e5kpWlxKtgkOqnQbX0Qtt'
    this.client = new StoryblokClient({
      accessToken: this.token,
      cache: {
        clear: 'auto',
        type: 'memory'
      }
    })

    this.query = {}
  }

  getCacheVersion() {
    return this.client.cacheVersion
  }

  get(slug, params, draft = false) {
    params = params || {}

    if (draft || this.getQuery('_storyblok') || this.devMode || (typeof window !== 'undefined' && window.storyblok)) {
      params.version = 'draft'
    }

    if (typeof window !== 'undefined' && typeof window.StoryblokCacheVersion !== 'undefined') {
      params.cv = window.StoryblokCacheVersion
    }

    return this.client.get(slug, params)
  }

  initEditor(reactComponent, force = false) {
    if (force || window.storyblok ) {
      window.storyblok.init({accessToken: this.token})
      window.storyblok.on(['change', 'published'], () => location.reload(true))
      window.storyblok.on('input', (event) => {
        if (event.story.content._uid === reactComponent.state.pageContent._uid) {
          reactComponent.setState({pageContent: event.story.content})
        }
      })
    }
  }

  setQuery(query) {
    this.query = query
  }

  getQuery(param) {
    return this.query[param]
  }

  bridge(force = false) {
    if (!this.getQuery('_storyblok') && !force) {
      return ''
    }
    return (<script src='//app.storyblok.com/f/storyblok-latest.js'></script>)
  }
}

const storyblokInstance = new StoryblokService()

export default storyblokInstance
