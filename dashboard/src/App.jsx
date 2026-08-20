import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const today = new Date();

  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const dateRange = `${formatDate(startDate)} - ${formatDate(today)}`;


  const [inputValue, setInputValue] = useState({
    revenueGenerated: "",
    linkedinUmang: "",
    facebookUmang: "",
    youtubeUmang: "",
    pinterestUmang: "",
    instagramUmang: "",
    twitterUmang: "",
    instagramIntegers: "",
    youtubeIntegers: "",
    facebookIntegers: "",
    linkedinIntegers: "",
    instagramAadar: "",
    linkedinAadar: "",
  });

  const [error, setError] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputValue((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newError = {};

    Object.keys(inputValue).forEach((key) => {
      if (inputValue[key] === "") {
        newError[key] = "This field is required";
      } else if (inputValue[key] < 0) {
        newError[key] = "Value cannot be negative";
      }
    });

    return newError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});

    try {
      setLoading(true);
      const response = await fetch(
        "https://marketingdashboardnextjs-production.up.railway.app/api/marketing-dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputValue),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success(data.message || "Data saved successfully");

      setInputValue({
        revenueGenerated: "",
        linkedinUmang: "",
        facebookUmang: "",
        youtubeUmang: "",
        pinterestUmang: "",
        instagramUmang: "",
        twitterUmang: "",
        instagramIntegers: "",
        youtubeIntegers: "",
        facebookIntegers: "",
        linkedinIntegers: "",
        instagramAadar: "",
        linkedinAadar: "",
      });

      setError({});
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="date-text"><h2>Umang Global Group</h2><p>{dateRange}</p></div>

        <div className="container">
          <div>
            <label htmlFor="revenueGenerated">
              Revenue Generated (Total Leads) <sup>*</sup>
            </label>
            <input
              type="number"
              id="revenueGenerated"
              name="revenueGenerated"
              value={inputValue.revenueGenerated}
              onChange={handleChange}
            />
            {error.revenueGenerated && (
              <p className="error">{error.revenueGenerated}</p>
            )}
          </div>

          <div>
            <label htmlFor="linkedinUmang">
              Linkedin (Social Impression) <sup>*</sup>
            </label>
            <input
              type="number"
              id="linkedinUmang"
              name="linkedinUmang"
              value={inputValue.linkedinUmang}
              onChange={handleChange}
            />
            {error.linkedinUmang && (
              <p className="error">{error.linkedinUmang}</p>
            )}
          </div>

          <div>
            <label htmlFor="facebookUmang">
              Facebook (Social Impression) <sup>*</sup>
            </label>
            <input
              type="number"
              id="facebookUmang"
              name="facebookUmang"
              value={inputValue.facebookUmang}
              onChange={handleChange}
            />
            {error.facebookUmang && (
              <p className="error">{error.facebookUmang}</p>
            )}
          </div>

          <div>
            <label htmlFor="youtubeUmang">
              Youtube (Social Impression) <sup>*</sup>
            </label>
            <input
              type="number"
              id="youtubeUmang"
              name="youtubeUmang"
              value={inputValue.youtubeUmang}
              onChange={handleChange}
            />
            {error.youtubeUmang && (
              <p className="error">{error.youtubeUmang}</p>
            )}
          </div>

          <div>
            <label htmlFor="pinterestUmang">
              Pinterest (Social Impression) <sup>*</sup>
            </label>
            <input
              type="number"
              id="pinterestUmang"
              name="pinterestUmang"
              value={inputValue.pinterestUmang}
              onChange={handleChange}
            />
            {error.pinterestUmang && (
              <p className="error">{error.pinterestUmang}</p>
            )}
          </div>

          <div>
            <label htmlFor="instagramUmang">
              Instagram (Social Impression) <sup>*</sup>
            </label>
            <input
              type="number"
              id="instagramUmang"
              name="instagramUmang"
              value={inputValue.instagramUmang}
              onChange={handleChange}
            />
            {error.instagramUmang && (
              <p className="error">{error.instagramUmang}</p>
            )}
          </div>

          <div>
            <label htmlFor="twitterUmang">
              Twitter (Social Impression) <sup>*</sup>
            </label>
            <input
              type="number"
              id="twitterUmang"
              name="twitterUmang"
              value={inputValue.twitterUmang}
              onChange={handleChange}
            />
            {error.twitterUmang && (
              <p className="error">{error.twitterUmang}</p>
            )}
          </div>
        </div>

        <h2>Integers Insights</h2>

        <div className="container">
          <div>
            <label htmlFor="instagramIntegers">
              Instagram (Social Performance) <sup>*</sup>
            </label>
            <input
              type="number"
              id="instagramIntegers"
              name="instagramIntegers"
              value={inputValue.instagramIntegers}
              onChange={handleChange}
            />
            {error.instagramIntegers && (
              <p className="error">{error.instagramIntegers}</p>
            )}
          </div>

          <div>
            <label htmlFor="youtubeIntegers">
              Youtube (Social Performance) <sup>*</sup>
            </label>
            <input
              type="number"
              id="youtubeIntegers"
              name="youtubeIntegers"
              value={inputValue.youtubeIntegers}
              onChange={handleChange}
            />
            {error.youtubeIntegers && (
              <p className="error">{error.youtubeIntegers}</p>
            )}
          </div>

          <div>
            <label htmlFor="facebookIntegers">
              Facebook (Social Performance) <sup>*</sup>
            </label>
            <input
              type="number"
              id="facebookIntegers"
              name="facebookIntegers"
              value={inputValue.facebookIntegers}
              onChange={handleChange}
            />
            {error.facebookIntegers && (
              <p className="error">{error.facebookIntegers}</p>
            )}
          </div>

          <div>
            <label htmlFor="linkedinIntegers">
              Linkedin (Social Performance) <sup>*</sup>
            </label>
            <input
              type="number"
              id="linkedinIntegers"
              name="linkedinIntegers"
              value={inputValue.linkedinIntegers}
              onChange={handleChange}
            />
            {error.linkedinIntegers && (
              <p className="error">{error.linkedinIntegers}</p>
            )}
          </div>
        </div>

        <h2>Aadar</h2>

        <div className="container">
          <div>
            <label htmlFor="instagramAadar">
              Instagram (Digital Performance) <sup>*</sup>
            </label>
            <input
              type="number"
              id="instagramAadar"
              name="instagramAadar"
              value={inputValue.instagramAadar}
              onChange={handleChange}
            />
            {error.instagramAadar && (
              <p className="error">{error.instagramAadar}</p>
            )}
          </div>

          <div>
            <label htmlFor="linkedinAadar">
              Linkedin (Digital Performance) <sup>*</sup>
            </label>
            <input
              type="number"
              id="linkedinAadar"
              name="linkedinAadar"
              value={inputValue.linkedinAadar}
              onChange={handleChange}
            />
            {error.linkedinAadar && (
              <p className="error">{error.linkedinAadar}</p>
            )}
          </div>
        </div>

        <div className="btn-container">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
