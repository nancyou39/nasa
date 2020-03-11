import React, {Component} from 'react';
import './App.css';
import './media.css';
import {Button} from 'antd'


//import { render } from 'react-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      nasa: []
    }
  }
  componentWillMount() {
    this.getData()
  }
  async getData() {
    const key = 'GtEzNdo5mi0YSZoErBBbklQgnumpHcByw7bhjeGs'
    let url = 'https://api.nasa.gov/planetary/apod?'
    url += 'api_key='+key
    //url += '&date='+YYYY-MM-DD
    //url += '&hd='+'true'
    const r = await fetch(url)
    const body = await r.json() 
    this.setState({nasa: body})
  }


  render() {
    return (
      <div className="App">
      <header className="App-header">
        <div className="logo-wrap">
          <div className="site-title">
            Astronomy Picture of the Day
            </div>
          <img className="logo"
            alt="logo"
            src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png" 
          />
        
      </div>
      
      <div className="input-wrap">
        <Nasaphoto nasaInfo={this.state.nasa}></Nasaphoto> 
      </div>

    <div className="button">
      <Button 
        type="primary" 
        href="https://apod.nasa.gov/apod/archivepix.html">
          Past Photos
      </Button>

    </div>

      </header>
      <div className="nasa">
      </div>
    </div>
    )
  }
}


function Nasaphoto(props){
  console.log(props.nasaInfo.url)
  return <div className="nasaphoto">
    <img src={props.nasaInfo.url} alt="nasaphoto" />
    <div className="image-text-wrap">
      <div className="nasaphoto-title">{props.nasaInfo.title}</div>
      <div className="date">{props.nasaInfo.date}</div>
      <div className="nasaphoto-descript">{props.nasaInfo.explanation}</div>
    </div>
  </div>
}

export default App;