import NextHead from 'next/head'
import Components from '../components/index'
import StoryblokService from '../utils/StoryblokService'
import SbEditable from 'storyblok-react'
import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        pageContent: null,
    }
    
  }

  static async getInitialProps(props) {
      console.log('oo', props)
    // StoryblokService.setQuery(query)
    // let slug = query.slug || 'home'

    // return {
    // //   page: await StoryblokService.get(`cdn/stories/${slug}`)
    // }
    return {};
  }

  componentDidMount() {
    StoryblokService.initEditor(this)
    const slug = this.props.url.query.slug;
    
    StoryblokService.setQuery(slug);

    StoryblokService.get(`cdn/stories/${slug}`).then((a, b) => {
        console.log(a,b);
        this.setState({
            pageContent: a.data.story.content
            // page: await StoryblokService.get(`cdn/stories/${slug}`)
        })
    });

    
  }

  render() {
    return (
      <div>
        <NextHead>
          {StoryblokService.bridge()}
        </NextHead>
        Preview
        {this.state.pageContent && Components(this.state.pageContent)}

        <style jsx global>{`
          html {
              font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              font-size: 16px;
              word-spacing: 1px;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              -moz-osx-font-smoothing: grayscale;
              -webkit-font-smoothing: antialiased;
              box-sizing: border-box;
            }

            *, *:before, *:after {
              box-sizing: border-box;
              margin: 0;
            }

            .teaser,
            .column {
              font-size: 2rem;
              text-align: center;
              line-height: 3;
              background: #ebeff2;
              border-radius: 10px;
              margin: 10px 5px;
            }

            .grid {
              display: flex;
            }

            .column {
              flex: 1;
            }
          `}</style>
      </div>
    )
  }
}
