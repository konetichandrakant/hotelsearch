import { useEffect, useState } from 'react';
import '../src/App.css'
import axios from 'axios';
import Hotels from './components/Hotels';
import Places from './components/Places';
import Restaurants from './components/Restaurants';
import Offices from './components/Offices';

// https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1458/data.json

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [inputField, setInputField] = useState("");
  const [inputList, setInputList] = useState([]);
  const [index, setIndex] = useState(-1);
  const [showIndex, setShowIndex] = useState(0);

  useEffect(() => {
    axios.get('https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1458/data.json').
      then((response) => {
        setJsonData(response.data);
        console.log(response.data);
      }).catch((response) => {
        console.log(response)
      })
  }, [])

  const changeInputField = (name) => {
    let list = [];
    setIndex(-1);

    if (name === '') {
      setInputList([]);
      return;
    }

    for (let i = 0; i < jsonData.length; i++) {
      let cityName = jsonData[i]['name'];
      if (cityName.toLowerCase().startsWith(name.toLowerCase())) {
        list.push(cityName);
        setIndex(i);
      }
    }
    setInputList(list);
  }

  return (
    <div style={(index !== -1) ? {
      backgroundImage: `url(${jsonData[index]['backgroundUrl']})`, backgroundSize: 'cover', objectFit: 'cover', backgroundRepeat: 'no-repeat', height: '100vh'
    } : { height: '100vh' }}>

      {
        jsonData && index !== -1 && (
          <div className='flex-row content-center-end'>
            <span style={{ margin: '10px' }}>
              <img src={jsonData[index]['weather']['icon']} />
            </span>
            <span style={{ margin: '10px', color: 'white', fontWeight: '500' }}>
              {jsonData[index]['weather']['temp']}
            </span>
            <span style={{ margin: '10px', color: 'white', fontWeight: '500' }}>
              {jsonData[index]['weather']['main']}
            </span>
          </div>
        )
      }

      <br />
      <br />
      <br />
      <br />

      <div className='flex-column'>
        <div className='flex-row' style={{ justifyContent: 'center' }}>
          <span>
            <input className='inputField' type='text' onChange={(e) => { setInputField(e.target.value); changeInputField(e.target.value); }} value={inputField} />
          </span>
          <span >
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" backgr>
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </span>
        </div>
        {
          <div>
            {
              inputList.map((x, i) => {
                return (
                  <div>
                    {inputList[i]}
                  </div>
                )
              })
            }
          </div>
        }
      </div>

      <div style={{ height: '50%' }}></div>

      {
        jsonData && index !== -1 && (
          <div>
            <div className='flex-row-content-center no-margin padding' style={{ color: 'white', background: 'black' }}>
              <div style={{ marginLeft: '10px', marginRight: '10px' }} onClick={() => { setShowIndex(0); }}>
                Places
              </div>

              <div style={{ marginLeft: '10px', marginRight: '10px' }} onClick={() => { setShowIndex(1); }}>
                Hotels
              </div>

              <div style={{ marginLeft: '10px', marginRight: '10px' }} onClick={() => { setShowIndex(2); }}>
                Restaurants
              </div>

              <div style={{ marginLeft: '10px', marginRight: '10px' }} onClick={() => { setShowIndex(3); }}>
                Offices
              </div>
            </div>

            {
              showIndex === 0 && (
                <div id='places'>
                  {
                    jsonData[index]['categories']['places'].map((x, i) => {
                      return (
                        <Places
                          closeAt={jsonData[index]['categories']['places'][i]['closeAt']}
                          desc={jsonData[index]['categories']['places'][i]['desc']}
                          entryFee={jsonData[index]['categories']['places'][i]['entryFee']}
                          imageUrl={jsonData[index]['categories']['places'][i]['imageUrl']}
                          name={jsonData[index]['categories']['places'][i]['name']}
                          openAt={jsonData[index]['categories']['places'][i]['openAt']}
                          rating={jsonData[index]['categories']['places'][i]['rating']}
                        />
                      )
                    })

                  }
                </div>
              )
            }

            {
              showIndex === 1 && (
                <div id='hotels'>
                  {
                    jsonData[index]['categories']['hotels'].map((x, i) => {
                      return (
                        <Hotels
                          address={jsonData[index]['categories']['hotels'][i]['address']}
                          checkIn={jsonData[index]['categories']['hotels'][i]['checkIn']}
                          checkOut={jsonData[index]['categories']['hotels'][i]['checkOut']}
                          imageUrl={jsonData[index]['categories']['hotels'][i]['imageUrl']}
                          name={jsonData[index]['categories']['hotels'][i]['name']}
                          price={jsonData[index]['categories']['hotels'][i]['price']}
                          rating={jsonData[index]['categories']['hotels'][i]['rating']}
                        />
                      )
                    })
                  }
                </div>
              )
            }

            {
              showIndex === 2 && (
                <div id='restaurants'>
                  {
                    jsonData[index]['categories']['restaurants'].map((x, i) => {
                      return (
                        <Restaurants
                          address={jsonData[index]['categories']['restaurants'][i]['address']}
                          closeAt={jsonData[index]['categories']['restaurants'][i]['closeAt']}
                          imageUrl={jsonData[index]['categories']['restaurants'][i]['imageUrl']}
                          name={jsonData[index]['categories']['restaurants'][i]['name']}
                          openAt={jsonData[index]['categories']['restaurants'][i]['openAt']}
                          price={jsonData[index]['categories']['restaurants'][i]['price']}
                          rating={jsonData[index]['categories']['restaurants'][i]['rating']}
                        />
                      )
                    })
                  }
                </div>
              )
            }

            {
              showIndex === 3 && (
                <div id='offices'>
                  {
                    jsonData[index]['categories']['offices'].map((x, i) => {
                      return (
                        <Offices
                          address={jsonData[index]['categories']['offices'][i]['address']}
                          area={jsonData[index]['categories']['offices'][i]['area']}
                          cabins={jsonData[index]['categories']['offices'][i]['cabins']}
                          desc={jsonData[index]['categories']['offices'][i]['desc']}
                          imageUrl={jsonData[index]['categories']['offices'][i]['imageUrl']}
                          name={jsonData[index]['categories']['offices'][i]['name']}
                          price={jsonData[index]['categories']['offices'][i]['price']}
                          seats={jsonData[index]['categories']['offices'][i]['seats']}
                        />
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
}

export default App;