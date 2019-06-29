import React, { Component } from 'react'

class QuoteMachina extends Component {

    // constructor declares endpoint

    constructor() {
        super();
        this.state = {
            quote: {
                content: '',
                link: '',
                title: '',
            },
            hasQuote: false
        }
        this.END_POINT = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    }

    getQuote = e =>{
        console.log("getting quote");
        fetch(this.END_POINT)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data[0].content && data[0].title){
            let { quote } = this.state;
            quote.content = data[0].content;
            quote.link = data[0].link;
            quote.title = data[0].title;
            this.setState({ quote }, () => {
                if(this.state.hasQuote === false) {
                    this.setState({hasQuote: true})
                }
            })
            }
            else{
                return console.error("no quote found");
            }
        })
    }
  render() {
      console.log(this.state);
      const {hasQuote, quote} = this.state;
    return (
      <div>
        <h1>QuoteMachina 2</h1>
        <button onClick={this.getQuote}>Get Quote</button>
        <br/><br/>
        {hasQuote === true ? JSON.stringify(quote) : "no quote yet"}
      </div>
    )
  }
}

export default QuoteMachina
