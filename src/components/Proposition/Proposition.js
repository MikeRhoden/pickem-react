import React from 'react'
import './Proposition.css'

export default function Proposition(props) {
    // game odds : spread : moneyline : total
    // to win
    const visitor = props.visitor
    const vis = props.vis
    const home = props.home
    const ho = props.ho
    const favorite = props.favorite
    const spread = props.spread
    const visitorSpread = favorite === vis ? '(-' + spread + ')' : ''
    const homeSpread = favorite === ho ? '(-' + spread + ')' : ''
    const note = props.note
    const start = props.start

    return (
        <div className="proposition">
            <div className="proposition-pick">
                <div className="proposition-visitor">
                    <input type="radio" name="game_1" value="HOU" />
                    <span className="visitor">{visitor}</span>
                </div>
                <div className="spread">
                    <span>{visitorSpread}</span>
                </div>
                <div className="proposition-home">
                    <input type="radio" name="game_1" value="UCF" />
                    <span className="home">{home}</span>
                </div>
                <div className="spread">
                    <span>{homeSpread}</span>
                </div>
                <div className="proposition-info">
                    <div className="proposition-note">
                        {note}
                    </div>
                    <div className="proposition-start">
                        {start}
                    </div>
                </div>
            </div>
            <div className="proposition-weight">
                <div>
                    <select name="val_1">
                        <option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option>
                    </select>
                </div>
                <div className="clear">
                    <button>clear</button>
                </div>
            </div>
        </div>
    )
}