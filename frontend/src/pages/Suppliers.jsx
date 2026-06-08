import React, {
useEffect,
useState
} from "react";

import axios from "axios";

const Suppliers = () => {

const [suppliers,
setSuppliers] = useState([]);

const [formData,
setFormData] = useState({

  name: "",
  company: "",
  email: "",
  phone: "",
  lead_time: "",
  reliability: ""
});


useEffect(() => {


loadSuppliers();


}, []);

const loadSuppliers = async () => {


try {

  const response =
    await axios.get(
      "http://localhost:5000/suppliers"
    );

  setSuppliers(
    response.data.data || []
  );

} catch (error) {

  console.log(error);

}

};

const handleChange = (e) => {


setFormData({

  ...formData,

  [e.target.name]:
    e.target.value

});

};

const addSupplier = async (e) => {


e.preventDefault();

try {

  await axios.post(
    "http://localhost:5000/suppliers",
    formData
  );

  alert(
    "Supplier Added Successfully"
  );

  setFormData({

    name: "",
    company: "",
    email: "",
    phone: "",
    lead_time: "",
    reliability: ""
  });

  loadSuppliers();

} catch (error) {

  console.log(error);

}


};

const deleteSupplier = async (id) => {

const confirmDelete =
  window.confirm(
    "Delete this supplier?"
  );

if (!confirmDelete) return;

try {

  await axios.delete(
    `http://localhost:5000/suppliers/${id}`
  );

  loadSuppliers();

} catch (error) {

  console.log(error);

}


};

return (


<div className="card">

  <h1>
    Supplier Management
  </h1>

  <br />

  <div
    style={{
      background:"#F8F4EE",
      padding:"20px",
      borderRadius:"12px",
      marginBottom:"25px"
    }}
  >
    <h2>
      Total Suppliers
    </h2>

    <h1>
      {suppliers.length}
    </h1>
  </div>

  <form
    onSubmit={addSupplier}
  >

    <input
      type="text"
      name="name"
      placeholder="Supplier Name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <br /><br />

    <input
      type="text"
      name="company"
      placeholder="Company"
      value={formData.company}
      onChange={handleChange}
      required
    />

    <br /><br />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      required
    />

    <br /><br />

    <input
      type="text"
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={handleChange}
      required
    />

    <br /><br />

      <input
    type="number"
    name="lead_time"
    placeholder="Lead Time (Days)"
    value={formData.lead_time}
    onChange={handleChange}
  />

  <br /><br />

  <input
    type="number"
    name="reliability"
    placeholder="Reliability %"
    value={formData.reliability}
    onChange={handleChange}
  />

<br></br>

    <button type="submit">
      Add Supplier
    </button>

  </form>

  <br />

<div
  style={{
    background:"#F8F4EE",
    padding:"20px",
    borderRadius:"12px",
    marginBottom:"20px"
  }}
>

  <h2>
    Supplier Performance
  </h2>

  <p>
    Evaluate suppliers based on
    reliability and delivery lead time.
  </p>

</div>

  <h2>
    Supplier Directory
  </h2>

  <br />

  {
    suppliers.length === 0
    ? (
      <p>
        No suppliers available.
      </p>
    )
    : (

      <table
        style={{
          width:"100%",
          borderCollapse:"collapse"
        }}
      >

        <thead>

          <tr>

            <th>Name</th>

            <th>Company</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Action</th>

            <th>Lead Time</th>
            
            <th>Reliability</th>
          </tr>

        </thead>

        <tbody>

          {
            suppliers.map(
              (supplier) => (

                <tr
                  key={supplier._id}
                >

                  <td>
                    {supplier.name}
                  </td>

                  <td>
                    {supplier.company}
                  </td>

                  <td>
                    {supplier.email}
                  </td>

                  <td>
                    {supplier.phone}
                  </td>

                  <td>
                    {supplier.lead_time} days
                  </td>

                  <td>
                    {supplier.reliability}%
                  </td>
                  
                  <td>

                    <button
                      onClick={() =>
                        deleteSupplier(
                          supplier._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    )
  }

</div>

);
};

export default Suppliers;
