import React, { Component } from 'react';


class Tourism extends Component {

    // state = {
    //     id:'',
    //     title:'',
    //     rating:null,
    //     agency:'',
    //     tour_day:'',
    //     min_price:'',
    //     tags:[],
    //     group:[],
    //     image_url:'',
    //     tour_detail_url:'',
    // }



    render() {
        const {title, rating, agency, tour_days, min_price, tags, group, image_url, tour_detail_url} = this.props.tourism;
        
        const star = [];
        for(let i = 1;i <= 5;i++){
            if(i <= rating){
                star.push('fas fa-star star-color')
            }else{
                star.push('fas fa-star')
            }
        }

        return (
            <div className="tourism">
                <div className="image-url">
                    <img src={image_url} alt=""/>
                </div>
                <div className="tourism-content">
                    <div className="vandor">
                        <span>{agency}  </span>
                        <span>
                        {star.map((s,index) => {
                            return (<i className={s} key={index}></i>)
                        })}
                        </span>
                    </div>
                    <div className="tour-link">
                        <a href={tour_detail_url}>{title}</a>
                    </div>
                    <div className="tags-box">
                        {tags.map((t,index) => {
                            return (<span className="tags" key={index}>{t}</span>)
                        })}
                    </div>
                    <a href={tour_detail_url} className="price-info">
                        <div className="tags-items">
                        {group.map(g => {
                            return (<div className="tags-1" key={g.id}>
                                <div>{g.date.replace(/-/g,'/').replace(/\d{4}\//,'')}</div>
                                <div>可售{g.quantity}位</div>
                            </div>)
                        })}
                        <div>更多日期</div>
                        </div>
                        <div className="how-much">
                            <span className="tour_days">{tour_days}</span>
                            <span className="how-much-span">天</span>
                            <span className="min-price">{min_price}</span>
                            <span className="how-much-span">元起</span>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Tourism;