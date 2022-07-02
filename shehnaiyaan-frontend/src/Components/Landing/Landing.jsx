import React from "react";
import pic from "../../Used Images/HomeHand.png";
import pic1 from "../../Used Images/BedSet(WhatWeOffer).png";
import pic2 from "../../Used Images/Appliances(WhatWeOffer).png";
import pic3 from "../../Used Images/Crock(WhatWeOffer).png";
import pic4 from "../../Used Images/AboutUs(Home).png";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className=" w-full p-20 bg-home bg-cover bg-no-repeat ">
      <div className=" grid  grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col">
          <span className="text-4xl font-bold font-serif text-black">
            Let's Bring <br /> Smiles Together
          </span>

          <motion.div
            className=" lazy-div mt-7 flex-5 text-slate-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos ab
              eveniet in modi est aliquid enim quas corporis similique itaque
              exercitationem assumenda officia natus nisi nemo illo quam omnis
              porro quo, incidunt minima. Harum deleniti id illum facere dolore
              necessitatibus qui aliquid blanditiis tempore quaerat repellendus
              fuga repellat delectus nam totam atque ab soluta, consequuntur non
              provident? Dolore in magni error, nostrum, quas aliquam doloremque
              eligendi quasi corporis debitis similique eaque hic alias neque.
              Consectetur quos dignissimos, rerum ducimus dicta voluptas
              deleniti animi facilis architecto atque deserunt autem, reiciendis
              non id libero. Sit, quasi cum vitae voluptatem odio qui harum!
            </span>
          </motion.div>
        </div>
        <img
          src={pic}
          alt=""
          className=" w-[380px]  md:text-center md:ml-auto "
        />
      </div>

      <div className="flex flex-col items-center mt-32">
        <motion.span className="text-5xl font-serif text-slate-600">
          What we Offer
        </motion.span>
        <span className="text-center mt-5 text-slate-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Nisi
          expedita rerum quaerat. Natus, dolorum odit! Aut numquam voluptate
          pariatur cumque.
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3  gap-8 mt-10 ">
          <div className=" flex flex-col items-center shadow-md hover:shadow-2xl  h-[550px] bg-white rounded-md">
            <img
              src={pic1}
              alt=""
              className=" w-[318px] rounded-t-md  rounded-bl-[8rem] rounded-br-[8rem] "
            />
            <span className="mt-9 text-lg font-medium text-black">Bed Set</span>
          </div>
          <div className=" flex flex-col items-center shadow-md hover:shadow-2xl h-[550px] bg-white rounded-md">
            <img
              src={pic2}
              alt=""
              className=" w-[318px] rounded-t-md rounded-bl-[8rem] rounded-br-[8rem]"
            />
            <span className="mt-9 text-black text-lg font-medium">
              Electric Appliances
            </span>
          </div>
          <div className=" flex flex-col items-center shadow-md hover:shadow-2xl h-[550px] bg-white rounded-md">
            <img
              src={pic3}
              alt=""
              className=" w-[318px] rounded-t-md rounded-b-[8rem]"
            />
            <span className="mt-9 text-black text-lg font-medium">Cockery</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 text-slate-700">
        <img
          src={pic4}
          alt=""
          className=" w-[400px] md:w-[600px] place-self-center "
        />
        <div className=" mt-4 flex flex-col md:items-left md:text-left place-self-center">
          <span className="font-serif text-3xl">Learn About Us</span>
          <span className="my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            nostrum consectetur facilis quibusdam quis libero expedita soluta.
          </span>
          <button className=" btn border-none hover:bg-indigo-600 mx-3 p-3 bg-indigo-500 rounded-tl-[18px] rounded-br-[18px] text-white px-8">
            Want to Know More?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
