import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/authcontext";
import gradeImg1 from "../images/gradeImg1.jpg";
import codingImg from "../images/codingImg.jpg";
import viewImg from "../images/viewImg.jpg"
import calculateImg from "../images/calculateImg.jpg";
import booksImg2 from "../images/booksImg2.jpg";

const Home = () => {
    const { auth } = useContext(AuthContext);
    const loggedin = auth.loggedin;
    const roles = auth.roles || [];

    if (loggedin) {
        if (roles.includes(100)) {
            return (
                <div className="p-8 max-w-lg mx-auto bg-base-200 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Admin Page</h1>
                    <Link to={"/admin"} className="btn btn-primary">Admin Page</Link>
                </div>
            );
        }
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="px-10 py-2 flex items-center justify-center">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
                    {/* Left Div with Text and Button */}
                    <div className="md:w-1/2 md:pr-10 mb-8 md:mb-0 p-5">
                        <h1 className="text-5xl font-bold mb-10 text-center md:text-left">Welcome to GradeMaster!</h1>
                        <p className="text-lg mb-8 text-center md:text-left">Your one-stop applicaation for GPA calculation and exploring coding profiles. Register and Calculate yout GPA</p>
                        {loggedin ? (
                            <Link to="/profile" className="btn btn-lg btn-primary mx-auto md:mx-0">Get Started</Link>
                        ) : (
                            <Link to="/login" className="btn btn-lg btn-primary mx-auto md:mx-0">Login</Link>
                        )}
                    </div>

                    {/* Right Div with Image */}
                    <div className="md:w-1/2">
                        <img src={gradeImg1} alt="Welcome Image" className="w-full rounded-lg" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20 px-7 text-center">
                <h2 className="text-4xl font-bold mb-12">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Feature 1: GPA */}
                    <div className="relative overflow-hidden p-6 bg-black rounded-lg shadow-lg text-white hover:-translate-y-6 transition duration-300">
                        <img src={calculateImg} alt="Grade Image 3" className="w-full h-48 object-cover mb-4 rounded-lg" />
                        <h3 className="text-xl font-bold mb-4">Calcualte your GPA</h3>
                        <p className="text-lg">Enter your grades and find your GPA</p>
                    </div>

                    {/* Feature 2: Grades */}
                    <div className="relative overflow-hidden p-6 bg-black rounded-lg shadow-lg text-white hover:-translate-y-6 transition duration-300">
                        <img src={viewImg} alt="Grade Image 1" className="w-full h-48 object-cover mb-4 rounded-lg" />
                        <h3 className="text-xl font-bold mb-4">View Your Grades</h3>
                        <p className="text-lg">Access and manage your grades seamlessly with GradeMaster.</p>
                    </div>

                    {/* Feature 3: Coding Profiles */}
                    <div className="relative overflow-hidden p-6 bg-black rounded-lg shadow-lg text-white hover:-translate-y-6 transition duration-300">
                        <img src={codingImg} alt="Grade Image 2" className="w-full h-48 object-cover mb-4 rounded-lg" />
                        <h3 className="text-xl font-bold mb-4">Coding Profiles</h3>
                        <p className="text-lg">Explore and showcase your coding journey with detailed profiles.</p>
                    </div>


                </div>
            </section>

            {/* Contact Us Section with Two Divs */}
            <section className="p-10 h-1/4">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
                    <div className="md:w-1/2 md:pr-10 mb-8 md:mb-0">
                        <img src={booksImg2} alt="Contact Image" className="w-full rounded-lg shadow-lg" />
                    </div>

                    <div className="md:w-1/2 p-5">
                        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Contact Us</h2>
                        <p className="text-lg mb-8 text-center md:text-left">For any inquiries or support, please feel free to contact us!</p>
                        <Link to="/contact" className="btn btn-lg btn-primary mx-auto md:mx-0">Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
