import React from "react";
import Abrar from "../../Assets/aavatA.png";
import Wajeeah from "../../Assets/AvatrW.png";
import Sufyan from "../../Assets/avatrS.png";
import kinza from "../../Assets/avatK.png";

const DummyUsers = [
  {
    name: "Wajeeah Parwaiz",
    career: "Software Engineer",
    field: "Graphic Designer",
    experties: "UX Designer",
    img: Wajeeah,
  },
  {
    name: "M Abrar Hussain",
    career: "Software Engineer",
    field: "MERN Stack Developer",
    img: Abrar,
  },
  {
    name: "Kanza Ahmad",
    career: "Software Engineer",
    field: "App Developer",
    experties: "SR Expert",
    img: kinza,
  },
  {
    name: "Sufyan Ahmad",
    career: "Software Engineer",
    field: ".net Stack Developer",
    img: Sufyan,
  },
];

const AboutComp = () => {
  return (
    <div className="w-full flex justify-center items-center bg-about bg-cover h-full bg-no-repeat p-4  ">
      {/* Container */}
      <div className=" my-5 w-[700px] h-auto z-20 backdrop-blur-md rounded-2xl shadow-2xl border-slate-300 p-4 flex flex-col items-center text-center">
        <span className=" text-2xl font-medium text-slate-800">Our Mission</span>
        <span className="my-3 text-slate-700">To remove Poverty</span>
        <span className=" text-2xl font-medium my-3 text-slate-800">About Us</span>
        <p className="text-slate-700">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero quo
          expedita non possimus vel? Voluptatum tempora quidem natus.
        </p>

        <br />

        <p className="text-slate-700 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nostrum
          exercitationem eveniet, pariatur dolore consequuntur quia earum dicta
          corrupti commodi hic repudiandae deserunt quibusdam blanditiis
          voluptatum nesciunt distinctio voluptates. Excepturi iusto velit dolor
          quo consectetur consequatur, perferendis impedit repellat, illo rerum
          expedita porro quas quaerat magni, officia ullam possimus minima?
          Doloribus, sequi temporibus eos ea beatae ad nemo modi aliquam
          exercitationem facilis neque amet ratione saepe consequatur ipsum a
          laborum ipsam iste repellat. Delectus dolores blanditiis minus optio
          rem libero modi quasi, mollitia error facere velit distinctio, placeat
          consequuntur. Unde quod dicta rem ad soluta asperiores est omnis optio
          quam!
        </p>

        <span className="text-2xl font-medium my-3 text-slate-800">Our Team</span>

        <div className="flex justify-around mt-4 text-slate-700">
          <div className="grid  grid-cols-2 md:grid-cols-4">
            {DummyUsers.map((usr, i) => (
              <div className="flex flex-col mx-3 items-center" key={i}>
                <img
                  src={usr.img}
                  alt=""
                  className="w-20 h-20 mt-2 rounded-full"
                />
                <span className="  font-medium">{usr.name}</span>
                <span className="text-sm font-medium  "> {usr.career} </span>
                <span className="text-sm">{usr.field}</span>
                <span className="text-sm">{usr.experties}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComp;
