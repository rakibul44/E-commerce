import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import { newsletterApi } from "../redux/apis/newsletterApi";
const footerData = {
  
  categories: [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Collections", link: "/product" },
    { id: 3, name: "About Us", link: "#" },
    { id: 4, name: "Blogs", link: "#" },
    { id: 5, name: "Offers", link: "#" },
    { id: 6, name: "Search", link: "#" },
  ],
  usefulLinks: [
    { id: 1, name: "My Account", link: "/login" },
    { id: 2, name: "My Cart", link: "/mycart" },
    { id: 3, name: "Wishlist", link: "/wishlist" },
    { id: 4, name: "FAQ's", link: "#" },
    { id: 5, name: "Contact Us", link: "/contact" },
  ],
  storeInfo: [
    "House #29, Road #10, Nikunja #2",
    "Call Us: 123-456-7898",
    "Email Us: Support@elans.Com",
  ],
  socialMedia: [
    { id: 1, icon: "fab fa-facebook-f", link: "#" },
    { id: 2, icon: "fab fa-twitter", link: "#" },
    { id: 3, icon: "fab fa-instagram", link: "#" },
    { id: 4, icon: "fab fa-pinterest", link: "#" },
  ],
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showScroll, setShowScroll] = useState(false);
  const [ subscribeNewsLetter ] = newsletterApi.useSubscribeNewsLetterMutation();

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

console.log(email)
  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
        setError('Please enter a valid email address.');
        return;
    }

    try {
      const data = { email: email}
      console.log("data: ", data)
       const res =  await subscribeNewsLetter(data);

       console.log(res)
       if(res?.data?.success){
        toast.success(res?.data?.message)
      } else if(res?.error){
        toast.error(res?.error?.data?.message)
      }
        setEmail('');
    } catch (error) {
      toast.error(error?.message)
        setError(`Failed to subscribe. Please try again. \n ${error?.message}`);
    }
};
  return (
    <footer className="bg-midnight py-12 text-gray-400 relative">
      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-xl font-semibold">KNOW IT ALL FIRST!</h3>
        <p className="text-sm mt-2">
          Never Miss Anything From Store By Signing Up To Our Newsletter.
        </p>
        <form onSubmit={SubmitHandler} className="mt-4 flex justify-center items-center gap-2">
          <input
            type="email"
             name="email"
            placeholder="Enter Email Address"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200 w-full sm:max-w-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className=" text-white px-6 py-2 rounded-md bg-orange-500 hover:bg-orange-600">
            SUBSCRIBE
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}

      </div>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo and Description */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-40 h-40 text-center" />
          </div>
          <p className="mt-4 text-sm">
            Discover the latest trends and enjoy seamless shopping with our
            exclusive collections.
          </p>
          <div className="mt-4 flex space-x-4">
            {footerData.socialMedia.map((social) => (
              <a
                key={social.id}
                href={social.link}
                className="text-gray-500 hover:text-gray-800"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Links Sections */}
        <div>
          <h4 className="text-lg font-semibold">Categories</h4>
          <ul className="mt-4 text-sm space-y-2">
            {footerData.categories.map((category) => (
              <li key={category.id}>
                <a href={category.link} className="hover:underline">
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Useful Links</h4>
          <ul className="mt-4 text-sm space-y-2">
            {footerData.usefulLinks.map((link) => (
              <li key={link.id}>
                <a href={link.link} className="hover:underline">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Store Information */}
        <div>
          <h4 className="text-lg font-semibold">Store Information</h4>
          <ul className="mt-4 text-sm space-y-2">
            {footerData.storeInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-800 text-white p-3 rounded-full animate-bounce shadow-lg hover:bg-gray-700 transition-all"
        >
          ↑
        </button>
      )}

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm border-t border-gray-200 pt-4">
        <p>2023-{`${ new Date().getFullYear()}`} copyright by Elans</p>
        {/* <div className="mt-4 flex justify-center space-x-4">
          {footerData.paymentMethods.map((method) => (
            <img
              key={method.id}
              src={method.src}
              alt={method.alt}
              className="w-10"
            />
          ))}
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
