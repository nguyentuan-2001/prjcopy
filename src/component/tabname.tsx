import React, { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react'
import './component.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Tabs, Tab, Row} from 'react-bootstrap';

const Tabname = () => {


    return(
        <div>
            <nav>
                <div className="nav nav-tabs mb-3" id="nav-tab-name" role="tablist">
                    <div className="table-responsive">
                        <table className="table">
                        <tbody>
                        <tr>
                            <td>
                                <button className="nav-link active" id="nav-khoa-tab" data-bs-toggle="tab" data-bs-target="#nav-khoa" type="button" role="tab" aria-controls="nav-khoa" aria-selected="true">Khoa - Viện đào tạo</button>
                            </td>
                            <td>
                                <button className="nav-link" id="nav-vien-tab" data-bs-toggle="tab" data-bs-target="#nav-vien" type="button" role="tab" aria-controls="nav-vien" aria-selected="false">Viện - Trung tâm nghiên cứu</button>
                            </td>
                            <td>
                                <button className="nav-link" id="nav-phong-tab" data-bs-toggle="tab" data-bs-target="#nav-phong" type="button" role="tab" aria-controls="nav-phong" aria-selected="false">Phòng - Ban -  Trung tâm</button>
                            </td>
                            <td>
                                <button className="nav-link" id="nav-thuvien-tab" data-bs-toggle="tab" data-bs-target="#nav-thuvien" type="button" role="tab" aria-controls="nav-thuvien" aria-selected="false">Thư viện - Phòng học</button>
                            </td>
                            <td>
                                <button className="nav-link" id="nav-cuahang-tab" data-bs-toggle="tab" data-bs-target="#nav-cuahang" type="button" role="tab" aria-controls="nav-cuahang" aria-selected="false">Cửa hàng - Quán xá</button>
                            </td>
                        </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </nav>
            <div className="" id="nav-tabContent">
                <div className="tab-pane fade active show" id="nav-khoa" role="tabpanel" aria-labelledby="nav-khoa-tab">
                    <ul className='ul__union'>
                        <li>
                            <span>1</span>
                            <img src="../images/union.png" alt="" />
                            <p>sdas</p>
                        </li>
                    </ul>
                </div>
                <div className="tab-pane fade" id="nav-vien" role="tabpanel" aria-labelledby="nav-vien-tab">
                    <ul className='ul__union'>
                        <li>
                            <span>1</span>
                            <img src="../images/union.png" alt="" />
                            <p>sdas</p>
                        </li>
                    </ul>
                </div>
                <div className="tab-pane fade" id="nav-phong" role="tabpanel" aria-labelledby="nav-phong-tab">
                    <ul className='ul__union'>
                        <li>
                            <span>1</span>
                            <img src="../images/union.png" alt="" />
                            <p>sdas</p>
                        </li>
                    </ul>
                </div>
                <div className="tab-pane fade" id="nav-thuvien" role="tabpanel" aria-labelledby="nav-thuvien-tab">
                    <ul className='ul__union'>
                        <li>
                            <span>1</span>
                            <img src="../images/union.png" alt="" />
                            <p>sdas</p>
                        </li>
                    </ul>
                </div>
                <div className="tab-pane fade" id="nav-cuahang" role="tabpanel" aria-labelledby="nav-cuahang-tab">
                    <ul className='ul__union'>
                        <li>
                            <span>1</span>
                            <img src="../images/union.png" alt="" />
                            <p>sdasdfd</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    )
}

export default Tabname