import { React, useState } from 'react'
import './Dashboard.css'
import DashboardData2019 from './data/DashboardData2019'
import DashboardData2018 from './data/DashboardData2018'

function initShowYears(years) {
    const showYears = {}
    years.forEach( year => {
        showYears[year] = true
    })
    return showYears
}

export default function Dashboard(props) {
    const years = ['2019', '2018']// '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010']
    const [ showYears, setShowYears ] = useState(initShowYears(years))

    const toggleLeaderboard = (year) => {
        const showYearsCopy = Object.assign({}, showYears)
        showYearsCopy[year] = !showYearsCopy[year]
        setShowYears(showYearsCopy)
    }

    const leaderBoards = years.map( year => {
        return (<div key={ 'leaderBoard-' + year } style={{ width: '300px', paddingBottom: '10px'}}>
            <p style={{ color: 'white', textAlign: 'center' }}>
                <button style={{ padding: '5px'}} onClick={() => toggleLeaderboard(year)}>
                    { year + (showYears[year] ? '----' : '++++') }</button>
            </p>
            {showYears[year] && <Leaderboard year={ year } />}
        </div>)
    })
    return (
        <div className="dashboard">
            {leaderBoards}
        </div>
    )
}

function Leaderboard(props) {
    const year = props.year
    const data = year === '2019' ? DashboardData2019() :
        (year === '2018' ? DashboardData2018() : {})

    const weeklyResults = data.weeklyResults.map( (result) => {
        const winners = result.winners.map( (winner, place) => <p key={ 'place-' + (place + 1) }>{ place + 1 }. { winner } </p>)
        return (
            <tr key={ '2019-week-' + result.week }>
                <td 
                    key={ 'week-' + result.week }
                    style={{borderWidth: '1px', borderColor: 'black', padding: '5px'}}
                    valign="middle"
                    align="center">{ result.week }</td>
                <td
                    key={ 'winners-' + result.week }
                    style={{borderWidth: '1px', borderColor: 'black', padding: '5px'}}
                    valign="top">{ winners }</td>
                <td
                    key={ 'results-' + result.week }
                    style={{borderWidth: '1px', borderColor: 'black', padding: '5px'}}
                    valign="middle"
                    align="center">
                        <a href={ 'http://big12pickem.com/results_grid_2019.asp?w=' + result.week }
                            target="_blank" rel="noreferrer"
                            style={{ color: '#0099CC', fontWeight: 'bold', textDecoration: 'underline'}}>Results</a></td>
            </tr>
        )
    })

    const bowlResults = !data.bowl.exists ? <></> : (
        <tr>
            <td
                style={{borderWidth: '1px', borderColor: 'black', padding: '5px'}}
                valign="middle"
                align="center">Bowls</td>
            <td 
                style={{borderWidth: '1px', borderColor: 'black', padding: '5px'}}
                valign="top">
                    { data.bowl.winners.map( (winner, place) => <p key={ 'place-' + (place + 1) }>{ place + 1 }. { winner } </p>) }</td>
            <td
                style={{borderWidth: '1px', borderColor: 'black', padding: '5px'}}
                valign="middle"
                align="center">
                    <a href={ data.bowl.link }
                        target="_blank" rel="noreferrer"
                        style={{ color: '#0099CC', fontWeight: 'bold', textDecoration: 'underline'}}>Results</a></td>
        </tr>        
    )
    return (
        <div>
        <table style={{backgroundColor: 'white', fontSize: '14px'}} align="center" width="100%">
		<tbody>
            <tr>
                <th style={{borderWidth: '1px', borderColor: 'black', width: '70px'}}>Week</th>
                <th style={{borderWidth: '1px', borderColor: 'black'}}>Winners</th>
                <th style={{borderWidth: '1px', borderColor: 'black', width: '90px'}}>View</th>
            </tr>
            {weeklyResults}
            {bowlResults}
        </tbody>
        </table>
        </div>
    )
}