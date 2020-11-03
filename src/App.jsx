import React, { Component } from 'react';
import ToolBox from './components/ToolBox';
import Tourism from './components/Tourism';
import axios from 'axios';
import './styles/App.css';

class App extends Component {


    state = {
        tourism:[],
        sort:true,
        pageNum:1,
        selectPage:1,
        pageTourism:[],
    }

    componentDidMount(){
        axios.get('https://interview.tripresso.com/tour/search')
        .then(res => {
            const tourism = res.data.data.tour_list
            this.setState({
                tourism:tourism,
            })
            this.showData()
        })
    }

    handleStar = (e) => {

        if(this.state.sort){
            const starTourism = [...this.state.tourism]
            starTourism.sort(function(a,b){
                return a.rating < b.rating ? 1 : -1;
            })
            this.setState({
                tourism:starTourism,
                sort:false,
                pageNum:1,
            })
        }
        
        setTimeout(() => this.showData(),100)
        
    }

    handleExpensive = () => {
        const price = [...this.state.tourism]

        price.sort(function(a,b){
            return parseInt(a.min_price) > parseInt(b.min_price) ? 1 : -1;
        })
        this.setState({
            tourism:price,
            sort:true,
            pageNum:1,
        })
        
        setTimeout(() => this.showData(),100)
        
    }

    handleCheap = () => {
        const price = [...this.state.tourism]

        price.sort(function(a,b){
            return parseInt(a.min_price) < parseInt(b.min_price) ? 1 : -1;
        })
        this.setState({
            tourism:price,
            sort:true,
            pageNum:1,
        })
        
        setTimeout(() => this.showData(),100)
        
    }

    changePageNumData = e => {
        let pageNum = e.currentTarget.textContent
        this.setState({pageNum:pageNum})
        
        setTimeout(() => this.showData(),100)
        
    }

    nextPage = () =>{
        if(this.state.pageNum <= this.state.pageTourism.length){
            this.setState({
                pageNum:parseInt(this.state.pageNum) + 1
            })
            setTimeout(() => this.showData(),100)
        }
    }

    prevPage = () =>{
        if(this.state.pageNum > 1){
            this.setState({
                pageNum:parseInt(this.state.pageNum) - 1
            })
            
            setTimeout(() => this.showData(),100)
        }
    }

    showData = () => {
        let pageNum = this.state.pageNum
        this.setState({  pageTourism : this.state.tourism.slice((pageNum - 1) * 3, pageNum * 3)})
    }
    

    render() {
        
        let pageItem  = []
        for(let i = 1; i <= Math.ceil(this.state.tourism.length / 3); i++){
            pageItem.push(
                <li className={
                    this.state.pageNum == i ? 'page-item page-item-focus' : 'page-item'
                    } onClick={this.changePageNumData} key={i}>{i}</li>
            )
        }
        

        return (
            <div className="app-wrapper">
                <ToolBox star={this.handleStar} expensive={this.handleExpensive} cheap={this.handleCheap}/>
                <div className="tourism-wrapper">
                {this.state.pageTourism.map((v,index) => {
                    return (<Tourism key={index} tourism={v}/>)
                })}
                </div>
                <div className="page-wrapper">
                    <ul>
                        <li className="page-item-prev" onClick={this.prevPage}><i className="fas fa-angle-left"></i></li>
                        {pageItem}
                        <li className="page-item-next" onClick={this.nextPage}><i className="fas fa-angle-right"></i></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;