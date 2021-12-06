import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Modal, Alert, Pressable, TextInput, TouchableOpacity, Picker, Button,ScrollView } from "react-native";

{/*  
**WORK DISTRIBUTION** 

Syarizal bin Shamsul (1815499)
  -Array map function
  -Drop course function
  -UI Design (styles)
Muhammad Amir Firdaus bin Zaidin (1716549)
  -Drop course function
  -Scrollview
  -Dropdown picker (Day)
Nurul Najihah Binti Khairul Najmy (1915634)
  -Add course function
  -Modal component
  -UI Design (styles)
Nurul Syahirah Syahmi Binti Mhd Azhar (1919070)
  -Remove duplicate function
  -Add course function
  -Dropdown picker (Time)
*/}

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      courseList: [],
      classTime: '',
      courseTime: ['8.00am - 9.50am', '10.00am - 11.20am', '11.30am - 12.50pm',
        '2.00pm - 3.20pm', '3.30pm - 4.50pm'],
      classDay: '',
      courseDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      courseCode: '',
      courseName: '',
      courseDrop: '',
      session: 0,
      modal1Visible: false,
      modal2Visible: false

    };
  }

  //Nurul Syahirah Syahmi Binti Mhd Azhar (1919070)
  //Nurul Najihah Binti Khairul Najmy (1915634)
  addCourse = () => {
    var addCourse = {
      courseCode: this.state.courseCode.toUpperCase(),
      courseName: this.state.courseName.toUpperCase(),
      classTime: this.state.classTime,
      classDay: this.state.classDay
    };
    var arr = this.state.courseList;
    arr.push(addCourse);
    
    return arr.map((item) => {
      return (
        <Text>
          {/* {item} */}
          {arr.map(item => <div>{item.courseCode}</div>)}
          {arr.map(item => <div>{item.courseName}</div>)}
          {arr.map(item => <div>{item.classTime}</div>)}
          {arr.map(item => <div>{item.classDay}</div>)}
        </Text>
      );
    });
  }

  //Muhammad Amir Firdaus bin Zaidin (1716549)
  //Syarizal bin Shamsul (1815499)
  DropCourse = () => {
    var arr = this.state.courseList;
    var courseCode = this.state.courseDrop.toUpperCase();
    var getIndex = 0;

    // arr.map

    for (let i = 0; i < this.state.courseList.length; i++) {

      if (this.state.courseList[i].courseCode == courseCode) {
        getIndex = i;

        console.log(getIndex)
        console.log(arr.splice(getIndex, 1))
        console.log(arr)

        break;
      }
    }
  }

  // Nurul Najihah Binti Khairul Najmy (1915634)
  setModal1Visible = (visible) => {
    this.setState({ modal1Visible: visible });
  }

  setModal2Visible = (visible) => {
    this.setState({ modal2Visible: visible });
  }

  //Nurul Syahirah Syahmi Binti Mhd Azhar (1919070)
  removeDuplicate(){
    //Remove duplicate from Arraylist
    const newArrayList = [];
    this.state.courseList.forEach(obj => {
      if (!newArrayList.some(o => o.id === obj.id)) {
        newArrayList.push({...obj});
      }
    });
 
    this.setState({courseList: newArrayList});  
  }

  //Syarizal bin Shamsul (1815499)
  //Muhammad Amir Firdaus bin Zaidin (1716549)
  render() {
    const { modal1Visible, modal2Visible } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}> Course Scheduling System </Text>
         <View style={styles.item}>
          <Text style={styles.header2}>Course List</Text>
          <ScrollView>
          <TouchableOpacity>
        {
          this.state.courseList.map((item, index) => (
            <Text style = {styles.box}>
              <div>Course code: {item.courseCode}</div>
              <div>Course name: {item.courseName}</div>
              <div>Class time: {item.classTime}</div>
              <div>Class day(s): {item.classDay}</div>
              <br></br>
            </Text>
          ))
          }
        </TouchableOpacity>
        </ScrollView>
        </View>

        {/* Nurul Najihah Binti Khairul Najmy (1915634) */}
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal1Visible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModal1Visible(!modal1Visible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput style={styles.input}placeholder="Enter course code..." onChangeText={(courseCode) => this.setState({ courseCode })}/>
            <TextInput style={styles.input2}placeholder="Enter course name..." onChangeText={(courseName) => this.setState({ courseName })}/>
               
            <View>
          {/*Select day*/}
          <Picker
            style={styles.picker} mode="dropdown" itemStyle={styles.itemStyle}
            onValueChange={(value, itemIndex) => this.setState({ classDay: value })}
          >
            <Picker.Item label='Select day' value='Select Day' />
            <Picker.Item label='Monday' value={this.state.courseDay[0]} />
            <Picker.Item label='Tuesday' value={this.state.courseDay[1]} />
            <Picker.Item label='Wednesday' value={this.state.courseDay[2]} />
            <Picker.Item label='Thursday' value={this.state.courseDay[3]} />
            <Picker.Item label='Friday' value={this.state.courseDay[4]} />
          </Picker>

          {/*Select time*/}
          <Picker
            style={styles.picker} mode="dropdown" itemStyle={styles.itemStyle}
            onValueChange={(value, itemIndex) => this.setState({ classTime: value })}
          >
            <Picker.Item label='Select time' value='Select Time' />
            <Picker.Item label='8.30am - 9.50am' value={this.state.courseTime[0]} />
            <Picker.Item label='10.00am - 11.20am' value={this.state.courseTime[1]} />
            <Picker.Item label='11.30am - 12.50pm' value={this.state.courseTime[2]} />
            <Picker.Item label='2.00pm - 3.20pm' value={this.state.courseTime[3]} />
            <Picker.Item label='3.30pm - 4.50pm' value={this.state.courseTime[4]} />
          </Picker>
        </View>
              <View>
        </View>
               {/*Submit add course*/}
        <Button style={{ margin: 12, }}
          title='Add'
          color='lime'
          onPress={this.addCourse}
        />

              <Pressable
                style={styles.buttonClose}
                onPress={() => this.setModal1Visible(!modal1Visible)}>
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
  
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModal1Visible(true)}
        >
          <Text style={styles.textStyle}>Add a Subject</Text>
        </Pressable>

         <Modal
          animationType="slide"
          transparent={true}
          visible={modal2Visible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModal2Visible(!modal2Visible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              {/*Drop*/}
        <TextInput style={styles.input} placeholder='Enter course code...'
          onChangeText={(courseDrop) => this.setState({ courseDrop })}
        />
        <Button style={{ margin: 12, }}
          title='Drop'
          color="red"
          onPress={this.DropCourse}
        />

              <Pressable
                style={styles.buttonClose}
                onPress={() => this.setModal2Visible(!modal2Visible)}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModal2Visible(true)}
        >
          <Text style={styles.textStyle}>Drop a Subject</Text>
        </Pressable>

      </View>
      <View style={{flex:1}}>
          <Button
            title="Remove duplicates"
            color="red"
            onPress={() => this.removeDuplicate()}
          />
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    height: 500, 
    borderColor: 'gray', 
    backgroundColor: "#f9c2ff", 
    borderWidth: 1,
    padding: 20,
    marginVertical: 8
  },
  box: {
    height: 80,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#D433FF"
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    backgroundColor: "#c39bc7",
    textAlign: "center",
  },
  header2: {
    fontSize:22,
    backgroundColor: "#f9c2ff",
  },
  title: {
    fontSize: 24
  },
   modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
  input2: {
    height: 40,
    marginTop: 0,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginBottom: 20,
    borderRadius: 40,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginVertical: 20,
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingVertical: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  picker: {
      width: 200,
      marginBottom: 10,
    },
});

export default App;
