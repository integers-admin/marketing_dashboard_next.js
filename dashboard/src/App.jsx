import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [inputValue, setInputValue] = useState({
    revenueGenerated: "",
    linkedinUmang: "",
    facebookUmang: "",
    youtubeUmang: "",
    pinterestUmang: "",
    instagramUmang: "",
    othersUmang: "",
    instagramIntegers: "",
    youtubeIntegers: "",
    twitterIntegers: "",
    linkedinIntegers: "",
    instagramAadar: "",
    youtubeAadar: "",
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
        othersUmang: "",
        instagramIntegers: "",
        youtubeIntegers: "",
        twitterIntegers: "",
        linkedinIntegers: "",
        instagramAadar: "",
        youtubeAadar: "",
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
        <h2>Umang Global Group</h2>

        <div className="container">
          <div>
            <label htmlFor="revenueGenerated">
              Revenue Generated (Total Leads)
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
              Linkedin (Social Impression)
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
              Facebook (Social Impression)
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
              Youtube (Social Impression)
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
              Pinterest (Social Impression)
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
              Instagram (Social Impression)
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
            <label htmlFor="othersUmang">
              Others (Social Impression)
            </label>
            <input
              type="number"
              id="othersUmang"
              name="othersUmang"
              value={inputValue.othersUmang}
              onChange={handleChange}
            />
            {error.othersUmang && (
              <p className="error">{error.othersUmang}</p>
            )}
          </div>
        </div>

        <h2>Integers Insights</h2>

        <div className="container">
          <div>
            <label htmlFor="instagramIntegers">
              Instagram (Social Performance)
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
              Youtube (Social Performance)
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
            <label htmlFor="twitterIntegers">
              Twitter (Social Performance)
            </label>
            <input
              type="number"
              id="twitterIntegers"
              name="twitterIntegers"
              value={inputValue.twitterIntegers}
              onChange={handleChange}
            />
            {error.twitterIntegers && (
              <p className="error">{error.twitterIntegers}</p>
            )}
          </div>

          <div>
            <label htmlFor="linkedinIntegers">
              Linkedin (Social Performance)
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
              Instagram (Digital Performance)
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
            <label htmlFor="youtubeAadar">
              Youtube (Digital Performance)
            </label>
            <input
              type="number"
              id="youtubeAadar"
              name="youtubeAadar"
              value={inputValue.youtubeAadar}
              onChange={handleChange}
            />
            {error.youtubeAadar && (
              <p className="error">{error.youtubeAadar}</p>
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
