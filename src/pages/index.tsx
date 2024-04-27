import { Inter } from "next/font/google";
import {db} from'@/utils/firebase';
import { useEffect, useState } from "react";
import {addDoc , collection, deleteDoc, doc, onSnapshot, query} from 'firebase/firestore'

const inter = Inter({ subsets: ["latin"] });

interface Testimonial {
  id:string,
  testimonial:string
}

const Home:React.FC =() => {
const [testimonials , setTestimonials] = useState<Testimonial[]>([]);
const [newTestimonial , setNewTestimonial] = useState<Testimonial>({id:"",testimonial:""})

//fetch as it identify id//
useEffect(()=> {
  const unsubsribe = onSnapshot(query(collection(db , "testimonials")) , (querySnapshot) => {
    const testimonialData : Testimonial[] = querySnapshot.docs.map(doc => ({id : doc.id , ...doc.data()}) as Testimonial)
  setTestimonials(testimonialData)
  })
  return () => unsubsribe();
},[])


//add data into firebase//
const addTestimonial = async() => {
  try {
    if(!newTestimonial.testimonial.trim()){
      return alert("Please fill in the form")
    } else {
      await addDoc(collection(db , "testimonials") , {
        testimonial : newTestimonial.testimonial
      })
    }
  } catch (error) {
    console.log(error)
  }
}

//deleting data//
const deleteTestimonial = async(id:string) => {
  try {
    await deleteDoc(doc(db , "testimonials" , id))
  } catch (error) {
    console.log(error)
  }
}


	return (
		<main className={`${inter.className} mx-auto max-w-2xl`}>
   <section className="border-b border-black py-4 px-4">
        <h1 className="text-[30px]">Education</h1>
      </section>
      <section className="p-4 space-y-4">
        <div className="bg-yellow-300 p-4 rounded-xl border border-black">
        <h2 className="font-bold">Taylor's University</h2>
        <p>I am a second year undergraduate student.</p>
        <p>Bacholor Degree in Computer Science : 2022 - 2026</p>
        <p>I am a club member of GDSC</p>
        </div>
        <div className="bg-yellow-300 p-4 rounded-xl border border-black">
        <h2 className="font-bold">Taylor's University</h2>
        <p>I am a master student.</p>
        <p>2026 - 2028</p>
        <p>I am a president of GDSC</p>
        </div>
      </section>

      <section className="border-b border-black py-4 px-4">
        <h1 className="text-[30px]">Experience</h1>
      </section>
      <section className="p-4 gap-4 grid grid-cols-2">
        <div className="bg-green-300 p-4 rounded-xl border border-black">
        <h2 className="font-bold">Intern</h2>
        <h3>Petronas Malaysia</h3>
        <p>I did my intern as an AI Trainer</p>
        <p>July 2024 - September 2024</p>
        </div>
        <div className="bg-green-300 p-4 rounded-xl border border-black">
        <h2 className="font-bold">Taylor's University</h2>
        <p>I am a master student.</p>
        <p>2026 - 2028</p>
        <p>I am a president of GDSC</p>
        </div>
      </section>

      <section className="border-b border-black py-4 px-4">
        <h1 className="text-[30px]">Testimonial</h1>
      </section>
      <section className="p-4 space-y-4 ">
       
          <div className="flex flex-row gap-4">
          <textarea placeholder="Type something" className="w-full border border-black rounded-xl p-2" onChange={(e) => setNewTestimonial({...newTestimonial , testimonial : e.target.value })}></textarea>
         <button className="bg-blue-300 p-4 rounded-xl" onClick={addTestimonial}>Submit</button>
         </div>
     
         {testimonials.map((testimonial) => (
           <div className="p-4 space y-4">
           <div className="p-4 rounded-xl border border-black">
             <p key={testimonial.id}>Testimonial : {testimonial.testimonial}</p>
             <button key={testimonial.id} className="bg-red-300 p-1 rounded-xl" onClick={()=>deleteTestimonial(testimonial.id)}>Delete</button>
           </div>
         </div>
         ))}
      </section>
		</main>
	);
}
 
export default Home;

