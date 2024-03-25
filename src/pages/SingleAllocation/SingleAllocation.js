import React, { useEffect, useState } from 'react'
import "./singleAllocation.scss"
import { useLocation } from 'react-router-dom'
import { colorList } from '../../constants/colorList'
export const SingleAllocation = () => {
    const location = useLocation()
    const allocation = location.state.allocation
    const layout = location.state.layout
    console.log(layout)
    const [teamKeyList, setTeamKeyList] = useState([])
    const handleReturnColor = (teamKeyValue) => {
        // console.log(teamKeyValue)
        const filteredValue = teamKeyValue?.replace(/\d/g, '');
        for (let i = 0; i < teamKeyList.length; i++) {
            if (filteredValue === teamKeyList[i]) {
                return colorList[i];
            }
        }
        return "grey";
    };

    useEffect(() => {
        const tempTeamKeyList = [];
        allocation?.teamData.teams.forEach((team) => {
            tempTeamKeyList.push(team?.teamCode);
        });
        setTeamKeyList(tempTeamKeyList);
    }, [allocation]);


    return (
        <div className='single-allocation-page'>
            <h2 className='h-1'>Team Details</h2>
            <div className='team-list-wrapper'>
            <table className="team-list">
                <thead>
                    <td>Team Key</td>
                    <td>Team Name</td>
                    <td>Team Count</td>
                </thead>
                <tbody>
                    {allocation &&
                        allocation.teamData.teams.map((team) => {
                            return (
                                <tr>
                                    <td>{team.teamCode}</td>
                                    <td>{team.teamName}</td>
                                    <td>{team.teamCount}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            </div>
            <h2 className='h-1'>Allocation Layout</h2>
            {allocation &&
                allocation.allocationDataList.map((items) => {
                    return (
                        <div className='allocation-layout'>
                            <p className='h-3'><span className='h-2'>Algorithm Preference : </span>{items.algorithmPref}</p>
                            <p className='h-3'><span className='h-2'>Algorithm Type :</span> {items.allocationType}</p>
                            <div className='table-wrapper'>
                            <table className="MyTable">
                                <tbody>
                                    {items.allocationLayout?.map((row, i) => {
                                        return (
                                            <tr key={i}>
                                                {row.map((value, j) => {
                                                    return (
                                                        <td
                                                            key={j}
                                                            className="grid-box"
                                                            style={{
                                                                backgroundColor:
                                                                    layout?.[i][j] === 1
                                                                        ? handleReturnColor(value)
                                                                        :
                                                                        "#f1f2f6",
                                                            }}
                                                        >
                                                            {value}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                                </div>
                        </div>
                    )
                })}
        </div>
    )
}
