import React, { useState } from 'react';
import '../App.css';
import moment from 'moment';

const List = () => {
  const [addtime, setaddTime] = useState(moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss ').toString());
  const [store, setStore] = useState([]);
  const [endTime, setendTime] = useState();
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);

  //to add an item

  const addItem = () => {
    if (!inputData) {
    } else if (!toggle) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggle(true);
      setInputData("");
      setisEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
      setaddTime(
        moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss ").toString()
      );
      setStore([...store, addtime]);
    }
  };

  // to delete an item

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      if (index == elem.id) {
        elem.strike = true;
      }
      return elem;
    });

    setItems(updatedItems);
  };

  // to edit an item

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id == id
    });
    setToggle(false);
    setInputData(newEditItem.name);
    setisEditItem(id);

  }
  
  //to remove time
  const deleteTime = () => {
    setendTime(
      moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss ').toString()
    );
  };

  // to remove all items

  const removeAll = () => {
    setItems([]);
    setStore([]);
  };

  return (
    <>
      <div className="parent-div">
        <div className="child-div">
          <h3>TO DO LIST</h3>
          <div className="addItems">
            <input
              type="text"
              placeholder="what needs to be done?"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {
              toggle ? <button type="button" onClick={addItem} className="btn btn-secondary"> Create</button> : <button type="button" onClick={addItem} className="btn btn-warning">Update</button>
            }
            
          </div>
          <div id="wrapper">
            <div id="left" className="showItems">
              {items.map((elem) => {
                return (
                  <div className="eachItem" key={elem.id}>
                    <h3
                      style={{
                        textDecoration: elem.strike ? 'line-through' : 'none',
                      }}
                    >
                      {elem.name}
                    </h3>
                    <div>
                    <button
                      type="button"
                      onClick={() => editItem(elem.id)}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteItem(elem.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                    </div>
                    
                  </div>
                );
              })}
            </div>
            <div id="right">
              {store.map((elim, ind) => {
                return (
                  <div className="eachdate" key={ind}>
                    <h6>{'Task Created at:' + elim} </h6>
{/*                     <button
                      type="button"
                      onClick={() => deleteTime()}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="showItems">
            <button onClick={removeAll} className="btn btn-danger">
              Delete All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
