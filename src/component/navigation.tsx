import React, { useState } from 'react';
import './component.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas);

const Navigation = () => {
    return(
        <div>
            <div id='all__select'>
                <div id='select__address'>
                    <div className='icon__select1'>
                        <span><FontAwesomeIcon icon="crosshairs" /></span>           
                        <select className="form-control form-control" id="start-street">
                            <option value="" disabled>
                                Chọn điểm bắt đầu
                            </option>
                        </select>
                    </div>
                    <div className='icon__select2'>
                        <span><FontAwesomeIcon icon="map-marker-alt" /></span>  
                        <select className="form-control input-solid" id="end-street">
                            <option value="" disabled>
                                Chọn điểm cần đến
                            </option>
                        </select>
                    </div>
                    <div id='dots'>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon="search" id='icon__search1'/>
                        <FontAwesomeIcon icon="search" id='icon__search2'/>
                    </div>
                    <div id='repeart'>
                        <img src="../images/repeart.png" alt="" />
                    </div>
                </div>
            </div>

            <div id='navigation__child'>
                <ul className="nav nav-pills" id="ul_navigation" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-dibo" data-bs-toggle="pill" data-bs-target="#dibo" type="button" role="tab" aria-controls="dibo" aria-selected="true">
                            <img src="../images/dibo.png" alt="" />
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-xedap" data-bs-toggle="pill" data-bs-target="#xedap" type="button" role="tab" aria-controls="xedap" aria-selected="false">
                            <img src="../images/xedap.png" alt="" />
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-xemay" data-bs-toggle="pill" data-bs-target="#xemay" type="button" role="tab" aria-controls="xemay" aria-selected="false">
                            <img src="../images/xemay.png" alt="" />
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-oto" data-bs-toggle="pill" data-bs-target="#oto" type="button" role="tab" aria-controls="oto" aria-selected="false">
                            <img src="../images/oto.png" alt="" />
                        </button>
                    </li>
                </ul>
                    <hr />
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="dibo" role="tabpanel" aria-labelledby="pills-dibo">
                        <div className='if-length'>
                            <div className="row">
                                <div className="col-lg-2">
                                    <div id='img_dibo'><img src="../images/dibo.png" alt="" /></div>
                                </div>
                                <div className="col-lg-7">
                                    <span>Đi thẳng</span>
                                </div>
                                <div className="col-lg-3">
                                    <div id='length'>
                                        <p id='length_street'></p>
                                        <p id='time_street'></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="xedap" role="tabpanel" aria-labelledby="pills-xedap">
                        <div id='all_img'>
                        <img src="https://static-images.vnncdn.net/files/publish/2022/9/3/bien-vo-cuc-thai-binh-346.jpeg" alt="" />
                        </div>
                    </div>
                    <div className="tab-pane fade" id="xemay" role="tabpanel" aria-labelledby="pills-xemay">
                        <p>sdf213</p>
                    </div>
                    <div className="tab-pane fade" id="oto" role="tabpanel" aria-labelledby="pills-oto">
                        <p>2313251</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation