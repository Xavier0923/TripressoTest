import React, { Component } from 'react';

class ToolBox extends Component {

    handleChangeSelect = e =>{
        if(e.target.value == '低到高'){
            this.props.expensive()
        }else if(e.target.value == '高到低'){
            this.props.cheap()
        }
    }

    render() {
        return (
            <div className="toolbox-wrapper">
                <div>排序</div>
                <button onClick={this.props.star}>精選評分</button>
                <select onChange={this.handleChangeSelect}>
                    <option value="" style={{display:'none'}}>價格排序</option>
                    <option value="低到高">價格 : 低到高</option>
                    <option value="高到低">價格 : 高到低</option>
                </select>
            </div>
        );
    }
}

export default ToolBox;