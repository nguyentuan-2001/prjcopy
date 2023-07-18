import React, { useState } from 'react';
import './component.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const Search = () => {
    
    return(
        <div>
            <div id='input_search'>
                <div id='border_input_search'></div>
                <input type="text" placeholder='Tìm kiếm tên khu vực' id='search__address' />
            </div>
            <div id='history__search'>
                <p>Tìm kiếm gần đây</p>
                <p>Cổng bắc</p>
            </div>
            <div id='list__address'>
                <p>Gợi ý</p>
                <ul id="suggestions-list"></ul>
            </div>
        </div>
    )
}

export default Search