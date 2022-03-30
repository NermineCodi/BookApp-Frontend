const uploadImage = async (obj) => {
   
  try {

    let body = new FormData();
    body.append('file', obj.file);
    body.append('name', "anythingcl")

    

    const response = await fetch(" http://localhost:4000/api/files/upload",  { method: "POST", body: body });
    const result = await response.json();

    console.log("result image:", result.response)

    if (result.success) {
     let image = {id: result.response._id, name: result.response.name}
     this.setState({image: image});
    } else {
      const error = result.message;
    }
  } catch (err) {
    this.setState({ error_message: err.message });
  }
}