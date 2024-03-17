import { useContext, useEffect, useState } from "react";
import "./Seating.scss";
import { CompanyName } from "../../context/CreateContext";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import { colorList } from "../../constants/colorList";
import { allocationApi, csvFileApi } from "../../actions/ApiCall";
import { RadioInput } from "../../components/RadioInput/RadioInput";
import { TextInput } from "../../components/TextInput/TextInput";
import { faArrowUpFromBracket, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorPopup } from "../../components/ErrorPopup/ErrorPopup";

const Seating = () => {
  const [isOutputGenerated, setIsOutput] = useState(false);
  const { companyName } = useContext(CompanyName);
  const formData = new FormData();
  const location = useLocation();
  const res = location.state.data;
  const flag = location.state.flag;
  let availableSpaces = location.state.availableSpaces;
  const [outputArray, setOutputArray] = useState();
  const [layOut, setLayOut] = useState(null);
  const [file, setFile] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [teamNameList, setTeamNameList] = useState([]);
  const [teamKeyList, setTeamKeyList] = useState([]);
  const [preference, setPreference] = useState(2);
  const [orderedTeamList, setOrderedTeamList] = useState([]);
  const [space, setSpace] = useState(availableSpaces);
  const [result, setResult] = useState(null);
  const navigate = useNavigate()
  const [error, setError] = useState(false);
  const layOutDto = {
    companyName: companyName,
    teamDtoList: teamList,
    preference: preference,
  };
  useEffect(() => {
    loadLayOut();
  }, []);


  const loadLayOut = async () => {
    setLayOut(res);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  formData.append('file', file);
  const handleSubmit = async () => {
    if (space >= 0) {
      console.log("error")
      setError(false)
      let arr = [];
      teamList?.map((team) => {
        arr.push(team?.TeamName);
      });
      setTeamNameList(arr);
      const result = handleResult(layOutDto);
      const res = await allocationApi(result);
      setIsOutput(true);
      setResult(res);
      setOutputArray(res?.data?.data?.allocation);
      let teamKeyList = [];
      res?.data?.data?.teamReferenceList?.map((team) => {
        teamKeyList.push(team?.key);
      });
      setTeamKeyList(teamKeyList);
      setOrderedTeamList(res?.data?.data?.teamReferenceList);
    } else {
      console.log("err")
      setError(true)
      setIsOutput(false);
    }
  };
  function handleResult(data) {
    return data;
  }
  const handleCloseBtn = (index) => {
    let arr = [...teamList];
    setSpace(space + arr[index].TeamCount);
    arr = arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
    setTeamList(arr);
  };

  const[csvData,setCsvData]=useState()
  const handleFileSubmit = async () => {
    try {
      // const res = await axios.post("http://localhost:8090/csvFile", formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   }
      // )
      const res = await csvFileApi(formData)
      console.log(res.data.data.teamDtoList)
      setCsvData(res.data.data.teamDtoList)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddTeam = () => {
    let arr = [...teamList];
    arr.push({
      TeamName: "",
      TeamCount: "",
    });
    setTeamList(arr);
  };

  const handleOnChange = (e, index) => {
    let arr = [...teamList];
    let spaces = space;
    if (teamList[index].TeamCount === "" && e.target.name === "TeamCount") {
      spaces -= Number(e.target.value);
      setSpace(spaces);
    }

    arr[index] = {
      ...arr[index],

      [e.target.name]:
        e.target.name === "TeamName" ? e.target.value : Number(e.target.value),
    };

    if (teamList[index].TeamCount !== "" && e.target.name === "TeamCount") {
      spaces += teamList[index].TeamCount;
      spaces -= Number(e.target.value);
      setSpace(spaces);
    }
    setTeamList(arr);
  };

  const handleReturnColor = (teamKeyValue) => {
    for (let i = 0; i < teamKeyList.length; i++) {
      if (teamKeyValue && teamKeyValue.includes(teamKeyList[i])) {
        return colorList[i];
      }
    }
    return "grey";
  };

  const handlePrefOnClick = (prefNum) => {
    setPreference(prefNum);
  }
  const handleClick = () => {
    document.getElementById('fileInput').click();
  };
  useEffect(() => {
    if (companyName === "") {
      navigate("/")
    }
  }, [companyName])
  useEffect(() => {
    function handle(e) {
      if (e.target.className === "product-popup-parent") {
        setError(false)
      }
    }
    window.addEventListener("click", handle)
    return () => window.removeEventListener("click", handle)
  }, [])
  return (
    <div className="seating">

      {!isOutputGenerated ?
      <div className="container-1">

        <table className="MyTable">
          <tbody>
            {flag ? (
              <>
                {res.layOut.map((row, i) => {
                  return (
                    <tr key={i}>
                      {row.map((value, j) => {
                        return (
                          <td
                            key={j}
                            className="grid-box"
                            style={{
                              backgroundColor:
                                value === 1 ? "#2ecc71" : "#f1f2f6",
                            }}>
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                {res.map((row, i) => {
                  return (
                    <tr key={i}>
                      {row.map((value, j) => {
                        return (
                          <td
                            key={j}
                            className="grid-box"
                            style={{
                              backgroundColor:
                                value === 1 ? "#2ecc71" : "#f1f2f6",
                            }}>
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>

        <div className="form-wrapper">
          <p className="h-1">Available Spaces : {space}</p>

          <div className="add-div">
            <p className="h-2">Add Team</p>
            <button className="add-btn" onClick={handleAddTeam}>
              + Add
            </button>
          </div>

          <div className="btn-wrapper">
            <p className="h-2">Count Priority </p>
            <RadioInput number={2} preference={preference} handlePrefOnClick={handlePrefOnClick} label="ASC" />
            <RadioInput number={1} preference={preference} handlePrefOnClick={handlePrefOnClick} label="DES" />
            <RadioInput number={3} preference={preference} handlePrefOnClick={handlePrefOnClick} label="Random" />
          </div>

          <div className="team-list-input-wrapper">
            <div className="team-list-container">
              {teamList &&
                teamList?.map((data, index) => {
                  return (
                    <div className="input-wrapper">
                      <TextInput type="text" name="TeamName" value={data.TeamName} index={index} handleOnChange={handleOnChange} />
                      <TextInput type="number" name="TeamCount" value={data.TeamCount} availableSpaces={availableSpaces} space={space} index={index} handleOnChange={handleOnChange} />
                      <button
                        className="cross-btn"
                        onClick={() => handleCloseBtn(index)}>
                        X
                      </button>
                    </div>
                  );
                })}
              <div className="input-file">
                <div className="or-div">
                  <div className="line"></div>
                  <p className="h-3">OR</p>
                  <div className="line"></div>
                </div>
                <div className='upload-wrapper' onClick={handleClick}>
                  <FontAwesomeIcon icon={faArrowUpFromBracket} size="3x" color="#387EED" />
                  <input
                    style={{ display: 'none' }}
                    onChange={handleFile}
                    id="fileInput"
                    type="file"
                  />
                  <button className='upload-btn'>
                    Upload csv file
                  </button>
                  <br></br>
                  <p className="uploaded-file">{file?.name}</p>
                </div>

                <button onClick={handleFileSubmit} className="click-btn">
                  <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "0.5rem" }} />
                  Verify to submit</button>
              </div>
            </div>
          </div>
          <div className="submit-wrapper">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      :
        <div className="container-1 ">
          <div className="layout-wrapper">
            <h2>Team Allocation Layout</h2>
            <div className="btn-wrapper">
              <div className="btn-options">
              <RadioInput handleSubmit={handleSubmit} number={2} preference={preference} handlePrefOnClick={handlePrefOnClick} label="ASC" />
              <RadioInput handleSubmit={handleSubmit} number={1} preference={preference} handlePrefOnClick={handlePrefOnClick} label="DES" />
              <RadioInput handleSubmit={handleSubmit}number={3} preference={preference} handlePrefOnClick={handlePrefOnClick} label="Random" />
              </div>
            <button onClick={handleSubmit} className="filter-btn">Apply Filter</button>
            </div>
            <table className="MyTable MyTable-2">
              <tbody>
                {outputArray?.map((row, i) => {
                  return (
                    <tr key={i}>
                      {row.map((value, j) => {
                        return (
                          <td
                            key={j}
                            className="grid-box"
                            style={{
                              backgroundColor: flag
                                ? res.layOut[i][j] === 1
                                  ? handleReturnColor(value)
                                  : "#f1f2f6"
                                : res?.[i][j] === 1
                                  ? handleReturnColor(value)
                                  : "#f1f2f6",
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
          <div className="team-key-continer">
            {teamNameList && <h2>Team Keys</h2>}
            <table className="team-key-list key-table">
              <thead>
                <td>Team Name</td>
                <td>Team Key</td>
              </thead>
              <tbody>
                {orderedTeamList &&
                  orderedTeamList.map((team) => {
                    return (
                      <tr>
                        <td>{team.name}</td>
                        <td>{team.key}</td>

                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* )} */}
        </div>
      }
      {
        error &&
        <div className='product-popup-parent'>
          <div className='product-popup'>
            <ErrorPopup />
          </div>
        </div>
      }
    </div>
  );
};

export default Seating;
