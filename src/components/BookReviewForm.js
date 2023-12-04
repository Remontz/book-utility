import React, { useRef, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCheck,
  faTimes,
  faInfoCircle,
  faUpload,
  faUser,
  faBook,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

import "../styles/ReviewForm.css";

const BookReviewForm = () => {
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const tab = "\u00a0\u00a0\u00a0";
  const [logo, setLogo] = useState("");

  // Field States
  // 1. Book Information
  const [book, setBook] = useState({
    title: "",
    author: "",
    coverArt: "",
    genre: "",
    subgenre: "",
    publisher: "",
    publicationYear: "",
    isbn: "",
  });
  const [isValidBook, setIsValidBook] = useState({
    title: false,
    author: false,
    genre: false,
    subgenre: false,
    publisher: false,
    publicationYear: false,
    isbn: false,
  });
  const [bookTitleFocused, setBookTitleFocused] = useState(false);
  const [authorFocused, setAuthorFocused] = useState(false);
  const [genreFocused, setGenreFocused] = useState(false);
  const [subgenreFocused, setSubgenreFocused] = useState(false);
  const [publicationYearFocused, setPublicationYearFocused] = useState(false);
  const [publisherFocused, setPublisherFocused] = useState(false);
  const [isbnFocused, setIsbnFocused] = useState(false);

  // 2. Reviewer Information
  const [reviewerInformation, setReviewerInformation] = useState({
    name: "",
    email: "",
    reviewDate: "",
    image: "",
  });
  const [isValidReviewer, setIsValidReviewer] = useState({
    name: false,
    email: false,
    reviewDate: false,
    image: false,
  });
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [reviewDateFocused, setReviewDateFocused] = useState(false);
  const [imageFocused, setImageFocused] = useState(false);

  // 3. Brief
  const [brief, setBrief] = useState({
    synopsis: "", // text area min 50 characters max 100 characters
    characters: [
      // {
      //     name: '',
      //     appearance: '',
      //     role: '',
      //     notes: '' // note character's attributes, personality, arc, development, motivations, morality, impact, and relationships. text area min 50 characters, max 2500 characters.
      // }
    ], // array of character objects, with name, appearance, role, and text area of notes
    themes: [], // an array of themes within the book, selectable themes.
  });
  // character input variables
  const [charNameInput, setCharNameInput] = useState("");
  const [charAppInput, setCharAppInput] = useState("");
  const [charRoleInput, setCharRoleInput] = useState("");
  const [charNotesInput, setCharNotesInput] = useState("");
  // current theme input
  const [currentThemeInput, setCurrentThemeInput] = useState("");
  const [isValidBrief, setIsValidBrief] = useState({
    synopsis: false,
    characters: false,
    themes: false,
  });
  const [synopsisFocused, setSynopsisFocused] = useState(false);
  const [charactersFocused, setCharactersFocused] = useState(false);
  const [characterNotesFocused, setCharacterNotesFocused] = useState(false);
  const [characterAppearanceFocused, setCharacterAppearanceFocused] =
    useState(false);
  const [themesFocused, setThemesFocused] = useState(false);

  // 4. Summary - text area min 300 characters max 500 characters
  const [summary, setSummary] = useState("");
  const [isValidSummary, setIsValidSummary] = useState(false);
  const [summaryFocused, setSummaryFocused] = useState(false);

  // 5. Analysis - text area min 300 characters max 5000 characters - mention writing style, plot, characters, themes, setting, originality, and impact.
  const [analysis, setAnalysis] = useState("");
  const [isValidAnalysis, setIsValidAnalysis] = useState(false);
  const [analysisFocused, setAnalysisFocused] = useState(false);

  // 6. Pros & Cons
  const [pros, setPros] = useState([]);
  const [prosInput, setProsInput] = useState("");
  const [isValidPros, setIsValidPros] = useState(false);
  const [prosFocused, setProsFocused] = useState(false);

  const [cons, setCons] = useState([]);
  const [consInput, setConsInput] = useState("");
  const [isValidCons, setIsValidCons] = useState(false);
  const [consFocused, setConsFocused] = useState(false);

  // 7. Critical Evaluation - text area min 100 characters max 300 characters - Book's strengths and weaknesses, compare to other books in the genre, and how it compares to the author's other works.
  const [criticalEvaluation, setCriticalEvaluation] = useState("");
  const [isValidCriticalEvaluation, setIsValidCriticalEvaluation] =
    useState(false);
  const [criticalEvaluationFocused, setCriticalEvaluationFocused] =
    useState(false);

  // 8. Rating - 1 to 5 stars
  const [rating, setRating] = useState(0);
  const [isValidRating, setIsValidRating] = useState(false);
  const [ratingFocused, setRatingFocused] = useState(false);

  const [ratingNotes, setRatingNotes] = useState(""); // text area min 10 characters max 150 characters - Optional
  const [isValidRatingNotes, setIsValidRatingNotes] = useState(false);
  const [ratingNotesFocused, setRatingNotesFocused] = useState(false);

  // 9. Conclusion - text area min 100 characters max 300 characters - Summarize the review and give a recommendation.
  const [recommendation, setRecommendation] = useState(false);
  const [isValidRecommendation, setIsValidRecommendation] = useState(false);
  const [recommendationFocused, setRecommendationFocused] = useState(false);

  // 10. Additional Notes - text area min 10 characters max 150 characters - Optional
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isValidAdditionalNotes, setIsValidAdditionalNotes] = useState(false);
  const [additionalNotesFocused, setAdditionalNotesFocused] = useState(false);

  // Set logo when component loads
  useEffect(() => {
    setLogo(process.env.PUBLIC_URL + "/images/logo.png");
  }, []);

  // Set Error Message when a field is invalid
  useEffect(() => {
    setErrMsg("");
  }, [
    book,
    reviewerInformation,
    brief,
    summary,
    analysis,
    pros,
    cons,
    criticalEvaluation,
    rating,
    ratingNotes,
    recommendation,
    additionalNotes,
  ]);

  // Validate Book Information
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    // validate title
    const isTitle = book.title.length >= 5 && book.title.length <= 50;
    // validate author
    const isAuthor = book.author.length >= 5 && book.author.length <= 25;
    // validate genre
    const isGenre = book.genre.length > 0;
    // validate subgenre
    const isSubgenre = book.subgenre.length > 0;
    // validate publisher
    const isPublisher =
      book.publisher.length >= 5 && book.publisher.length <= 25;
    // validate publication year
    const isPublicationYear =
      book.publicationYear.length === 4 &&
      book.publicationYear >= 1900 &&
      book.publicationYear <= currentYear;
    // validate isbn
    const isIsbn = book.isbn.length === 10 || book.isbn.length === 13;

    setIsValidBook({
      title: isTitle,
      author: isAuthor,
      genre: isGenre,
      subgenre: isSubgenre,
      publisher: isPublisher,
      publicationYear: isPublicationYear,
      isbn: isIsbn,
    });
  }, [book]);

  // Validate Reviewer Information
  useEffect(() => {
    // validate name
    const isName =
      reviewerInformation.name.length >= 5 &&
      reviewerInformation.name.length <= 25;
    // validate email
    const isEmail =
      reviewerInformation.email.length >= 5 &&
      reviewerInformation.email.length <= 50;
    // validate review date
    const isReviewDate = reviewerInformation.reviewDate.length === 10;
    // validate image
    const isImage = reviewerInformation.image.length > 0;

    setIsValidReviewer({
      name: isName,
      email: isEmail,
      reviewDate: isReviewDate,
      image: isImage,
    });
  }, [reviewerInformation]);

  // Validate Brief
  useEffect(() => {
    // validate synopsis
    const isSynopsis =
      brief.synopsis.length >= 50 && brief.synopsis.length <= 100;
    // validate characters
    // function to validate all characters
    const validateCharacters = (characters) => {
      characters = brief.characters;
      // validate all character names in the character array
      const isName = characters.every(
        (character) => character.name.length >= 3 && character.name.length <= 36
      );

      // validate all character appearances of the character array
      const isAppearance = characters.every(
        (character) =>
          character.appearance.length >= 10 &&
          character.appearance.length <= 150
      );

      // validate all character roles of the character array
      const isRole = characters.every(
        (character) =>
          character.role.length >= 10 && character.role.length <= 150
      );

      // validate all character notes of the character array
      const isNotes = characters.every(
        (character) =>
          character.notes.length >= 50 && character.notes.length <= 2500
      );

      // validate all characters by returning true if all are valid false if any are invalid
      return isName && isAppearance && isRole && isNotes;
    };
    // validate themes -- array must be greater than 0
    const isThemes = brief.themes.length > 0;

    setIsValidBrief({
      synopsis: isSynopsis,
      characters: validateCharacters(brief.characters),
      themes: isThemes,
    });
  }, [brief]);

  // Validate Summary
  useEffect(() => {
    const isSummary = summary.length >= 300 && summary.length <= 500;

    setIsValidSummary(isSummary);
  }, [summary]);

  // Validate Analysis
  useEffect(() => {
    const isAnalysis = analysis.length >= 300 && analysis.length <= 500;

    setIsValidAnalysis(isAnalysis);
  }, [analysis]);

  // Validate Pros & Cons
  useEffect(() => {
    const isPros = pros.length > 0;
    const isCons = cons.length > 0;

    setIsValidPros(isPros);
    setIsValidCons(isCons);
  }, [pros, cons]);

  // Validate Critical Evaluation
  useEffect(() => {
    const isCriticalEvaluation =
      criticalEvaluation.length >= 100 && criticalEvaluation.length <= 300;

    setIsValidCriticalEvaluation(isCriticalEvaluation);
  }, [criticalEvaluation]);

  // Validate Rating & Rating Notes
  useEffect(() => {
    const isRating = rating <= 5 && rating > 0;
    const isRatingNotes = ratingNotes.length >= 10 && ratingNotes.length <= 150;

    setIsValidRating(isRating);
    setIsValidRatingNotes(isRatingNotes);
  }, [rating, ratingNotes]);

  // Validate Recommendation & Additional Notes
  useEffect(() => {
    // validate recommendation
    const isRecommendation = recommendation !== false;
    // validate additional notes
    const isAdditionalNotes =
      additionalNotes.length >= 10 && additionalNotes.length <= 150;

    setIsValidAdditionalNotes(isAdditionalNotes);
    setIsValidRecommendation(isRecommendation);
  }, [recommendation, additionalNotes]);

  // Function to make sure all fields are valid
  const checkValidForm = () => {
    if (
      !(
        isValidSummary &&
        isValidAnalysis &&
        isValidPros &&
        isValidCons &&
        isValidCriticalEvaluation &&
        isValidRating &&
        isValidRatingNotes &&
        isValidRecommendation &&
        isValidAdditionalNotes
      )
    ) {
      setErrMsg("Please fill out all fields.");
      return false;
    } else if (
      Object.values(isValidBook).includes(false) ||
      Object.values(isValidReviewer).includes(false) ||
      Object.values(isValidBrief).includes(false)
    ) {
      setErrMsg(
        "Please fill out all fields in the Book Information, Reviewer Information, and Brief sections."
      );
      return false;
    } else {
      setShowSubmitButton(true);
      return true;
    }
  };

  // Function to clear form after 3 seconds
  const clearForm = () => {
    setTimeout(() => {
      setBook({
        title: "",
        author: "",
        genre: "",
        subgenre: "",
        publisher: "",
        publicationYear: "",
        isbn: "",
        coverArt: "",
      });
      setReviewerInformation({
        name: "",
        email: "",
        reviewDate: "",
        image: "",
      });
      setBrief({
        synopsis: "",
        characters: [],
        themes: [],
      });
      setSummary("");
      setAnalysis("");
      setPros([]);
      setCons([]);
      setCriticalEvaluation("");
      setRating(0);
      setRatingNotes("");
      setRecommendation(false);
      setAdditionalNotes("");
      setSuccess(false);
      setSuccessMsg("");
      setErrMsg("");
    }, 3000);
  };

  /* Function that sets text area class based on validity */
  const textAreaClass = (isValid, isFocused) => {
    // If text area is valid and focused set to valid
    if (isValid && isFocused) {
      return "valid";
    }
    // If text area is not valid and focused set to invalid
    else if (!isValid && isFocused) {
      return "invalid";
    }
    // Otherwise set to regular
    else {
      return "";
    }
  };
  /* Function that sets character notes text area class based on validity */
  const characterNotesClass = (length, isFocused, indicator) => {
    if (indicator === 9) {
      const isApp = length >= 10 && length <= 150;
      // If text area is valid and focused set to valid
      if (isApp && isFocused) {
        return "valid";
      }
      // If text area is not valid and focused set to invalid
      else if (!isApp && isFocused) {
        return "invalid";
      }
      // Otherwise set to regular
      else {
        return "";
      }
    } else {
      const isNotes = length >= 50 && length <= 2500;
      // If text area is valid and focused set to valid
      if (isNotes && isFocused) {
        return "valid";
      }
      // If text area is not valid and focused set to invalid
      else if (!isNotes && isFocused) {
        return "invalid";
      }
      // Otherwise set to regular
      else {
        return "";
      }
    }
  };

  /* Function that sets brief themes class based on validity */
  const briefThemesClass = (length, isFocused) => {
    /* if length is 5 or more and focused set to valid */
    const isThemes = length >= 5;
    if (isThemes && isFocused) {
      return "valid";
    } else if (!isThemes && isFocused) {
      return "invalid";
    } else {
      return "";
    }
  };

  /* Function that adds character to character array */
  const addCharacter = (name, role, appearance, note) => {
    const newCharacter = {
      name: name,
      role: role,
      appearance: appearance,
      notes: note,
    };
    setBrief({ ...brief, characters: [...brief.characters, newCharacter] });
    // clear character input fields
    setCharNameInput("");
    setCharRoleInput("");
    setCharAppInput("");
    setCharNotesInput("");
  };

  const addTheme = (theme) => {
    setBrief({ ...brief, themes: [...brief.themes, theme] });
    setCurrentThemeInput("");
  };

  // Submit Form
  const handleCreateReview = async (e) => {
    e.preventDefault();

    // Check if all fields are valid
    const validForm = checkValidForm();

    if (validForm) {
      setIsSubmitting(true);
      const newReview = {
        book: book,
        reviewerInformation: reviewerInformation,
        brief: brief,
        summary: summary,
        analysis: analysis,
        pros: pros,
        cons: cons,
        criticalEvaluation: criticalEvaluation,
        rating: rating,
        ratingNotes: ratingNotes,
        recommendation: recommendation,
        additionalNotes: additionalNotes,
      };
      console.log(newReview);
      setIsSubmitting(false);

      // Show Success Message Box for 3 seconds
    }
  };

  return (
    <section className="book-review">
      <h2 className="title">Book Review Form</h2>

      {/* Success Message */}
      <div
        className={`success-message ${success ? "show" : "hide"}`}
        aria-live="polite"
      >
        {success && (
          <p>
            Review Created Successfully! Clear Form...
            <button onClick={clearForm()}>Clear</button>
          </p>
        )}
      </div>

      {/* Error Message */}
      <div
        className={`error-message ${errMsg ? "show" : "hide"}`}
        aria-live="assertive"
      >
        {errMsg && <p>{errMsg}</p>}
      </div>

      {/* Form */}
      <form onSubmit={handleCreateReview} className="form-container">
        {/* Form Fields */}
        {/* Book Information & Reviewer Information */}
        <div className="introduction">
          {/* 1. Book Information */}
          <section className="Book-Information">
            <h3>Book Information</h3>
            {/* Book Title */}
            <label htmlFor="title">
              Title:{tab}
              {/* Book Title | Validation Icons */}
              <span className={isValidBook.title ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={
                  isValidBook.title || !book.title ? "hide" : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Book Title Field */}
              <input
                type="text"
                id="title"
                autoFocus
                autoCapitalize="true"
                required
                value={book.title}
                placeholder="Enter Book Title..."
                aria-invalid={isValidBook.title ? "false" : "true"}
                aria-describedby="titleNote"
                aria-required="true"
                aria-label="Book Title"
                onFocus={() => setBookTitleFocused(true)}
                onBlur={() => setBookTitleFocused(false)}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
              />
              {/* Book Title Note */}
              <p
                id="titleNote"
                className={
                  bookTitleFocused && book.title && !isValidBook.title
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Enter a book title between 5 and 50 characters. <br />
                Example: The Hobbit <br />
                Current Character Count: {book.title.length} <br />
                Must begin with a capitol letter.
              </p>
            </label>

            {/* Book Author */}
            <label htmlFor="author">
              Author:
              {/* Book Author | Validation Icons */}
              <span className={isValidBook.author ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={
                  isValidBook.author || !book.author ? "hide" : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Book Author Field */}
              <input
                type="text"
                id="author"
                required
                value={book.author}
                placeholder="Enter Author Name..."
                aria-invalid={isValidBook.author ? "false" : "true"}
                aria-describedby="authorNote"
                aria-required="true"
                aria-label="Book Author"
                onFocus={() => setAuthorFocused(true)}
                onBlur={() => setAuthorFocused(false)}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
              />
              {/* Book Author Note */}
              <p
                id="authorNote"
                className={
                  authorFocused && book.author && !isValidBook.author
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Enter an author name between 5 and 25 characters. <br />
                Example: J.R.R. Tolkien <br />
                Current Character Count: {book.author.length} <br />
                Must begin with a capitol letter.
              </p>
            </label>

            {/* Genre */}
            <label htmlFor="genre">
              Genre:{tab}
              {tab}
              {tab}
              {/* Genre | Validation Icons */}
              <span className={isValidBook.genre ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={
                  isValidBook.genre || !book.genre ? "hide" : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Genre Field */}
              <select
                type="text"
                id="genre"
                required
                value={book.genre}
                placeholder="Enter Genre..."
                aria-invalid={isValidBook.genre ? "false" : "true"}
                aria-describedby="genreNote"
                aria-required="true"
                aria-label="Book Genre"
                onFocus={() => setGenreFocused(true)}
                onBlur={() => setGenreFocused(false)}
                onChange={(e) => setBook({ ...book, genre: e.target.value })}
              >
                <option value="">Select a Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
              </select>
              <br />
              <br />
              {/* Sub-Genre */}
              {book.genre === "Fiction" && (
                <label htmlFor="subGenre">
                  Sub-Genre:
                  {/* Sub-Genre | Validation Icons */}
                  <span className={isValidBook.subgenre ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} className="faCheck" />
                  </span>
                  <span
                    className={
                      isValidBook.subgenre || !book.subgenre
                        ? "hide"
                        : "invalid"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} className="faTimes" />
                  </span>
                  {/* Fiction | Sub-Genre Field */}
                  <select
                    type="text"
                    id="subGenre"
                    required
                    value={book.subgenre}
                    placeholder="Enter Sub-Genre..."
                    aria-invalid={isValidBook.subgenre ? "false" : "true"}
                    aria-describedby="subGenreNote"
                    aria-required="true"
                    aria-label="Book Sub-Genre"
                    onFocus={() => setSubgenreFocused(true)}
                    onBlur={() => setSubgenreFocused(false)}
                    onChange={(e) =>
                      setBook({ ...book, subgenre: e.target.value })
                    }
                  >
                    <option value="Mystery">Mystery</option>
                    <option value="Science">Science</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Romance">Romance</option>
                    <option value="Historical">Historical</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Horror">Horror</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Literary">Literary</option>
                    <option value="Comic">Comic</option>
                    <option value="Other">Other</option>
                  </select>
                  {/* Fiction | Sub-Genre Note */}
                  <p
                    id="subGenreNote"
                    className={
                      subgenreFocused && book.subgenre && !isValidBook.subgenre
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="info-circle"
                    />
                    Select a sub-genre. <br />
                    Mystery Fiction may include: Crime, Detective, Suspense, and
                    Thriller. <br />
                    Science Fiction may include: Space, Cyberpunk, Distopian,
                    and Time Travel. <br />
                    Fantasy Fiction may include: Fairy Tale, Mythical,
                    Paranormal, Sword & Sorcery, and Urban. <br />
                    Romance Fiction may include: Historical, Contemporary,
                    Paranormal, Regency, and Romantic Suspense. <br />
                    Historical Fiction may include: Ancient, Medieval,
                    Renaissance, and Victorian. <br />
                    Thriller Fiction may include: Suspense, Psychological,
                    Legal, Political, Spy, Conspiracy, Medical and Techno.{" "}
                    <br />
                    Horror Fiction may include: Supernatural, Psychological,
                    Gothic, Lovecraftian, and Splatter. <br />
                    Adventure Fiction may include: Swashbuckling, Survival,
                    Pulp, Western, Sea, Treasure Hunt, and Travel. <br />
                    Literary Fiction may include: Coming of Age, Postmodern,
                    Existential, Metafiction, Social Commentary, and Magical
                    Realism. <br />
                    Comic Fiction may include: Hero, Manga, Graphic Novel,
                    Webcomic, Horror, and Fantasy. <br />
                  </p>
                </label>
              )}
              {book.genre === "Non-Fiction" && (
                <label htmlFor="subGenre">
                  Sub-Genre:
                  {/* Sub-Genre | Validation Icons */}
                  <span className={isValidBook.subgenre ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} className="faCheck" />
                  </span>
                  <span
                    className={
                      isValidBook.subgenre || !book.subgenre
                        ? "hide"
                        : "invalid"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} className="faTimes" />
                  </span>
                  {/* Non-Fiction | Sub-Genre Field */}
                  <select
                    type="text"
                    id="subGenre"
                    required
                    value={book.subgenre}
                    placeholder="Enter Sub-Genre..."
                    aria-invalid={isValidBook.subgenre ? "false" : "true"}
                    aria-describedby="subGenreNote"
                    aria-required="true"
                    aria-label="Book Sub-Genre"
                    onFocus={() => setSubgenreFocused(true)}
                    onBlur={() => setSubgenreFocused(false)}
                    onChange={(e) =>
                      setBook({ ...book, subgenre: e.target.value })
                    }
                  >
                    <option value="Biography">Biography</option>
                    <option value="Autobiography">Autobiography</option>
                    <option value="Memoir">Memoir</option>
                    <option value="Essay">Essay</option>
                    <option value="Self-Help">Self-Help</option>
                    <option value="Cookbook">Cookbook</option>
                    <option value="History">History</option>
                    <option value="Travel">Travel</option>
                    <option value="Other">Other</option>
                  </select>
                  {/* Non-Fiction | Sub-Genre Note */}
                  <p
                    id="subGenreNote"
                    className={
                      subgenreFocused && book.subgenre && !isValidBook.subgenre
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="info-circle"
                    />
                    Select a sub-genre. <br />
                    Biography Non-Fiction may include: Autobiography, Memoir,
                    and Essay. <br />
                    Self-Help Non-Fiction may include: Self-Help, Cookbook, and
                    Travel. <br />
                    History Non-Fiction may include: History, and Travel. <br />
                  </p>
                </label>
              )}
              {/* Genre Note */}
              <p
                id="genreNote"
                className={
                  genreFocused && book.genre && !isValidBook.genre
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Genre Must be selected. Current Selection: {
                  book.subgenre
                } - {book.genre}
              </p>
            </label>

            {/* ISBN */}
            <label>
              ISBN:
              {/* ISBN | Validation Icons */}
              <span className={isValidBook.isbn ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={isValidBook.isbn || !book.isbn ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* ISBN Field */}
              <input
                type="text"
                id="isbn"
                required
                value={book.isbn}
                placeholder="Enter ISBN..."
                aria-invalid={isValidBook.isbn ? "false" : "true"}
                aria-describedby="isbnNote"
                aria-required="true"
                aria-label="Book ISBN"
                onFocus={() => setIsbnFocused(true)}
                onBlur={() => setIsbnFocused(false)}
                onChange={(e) => setBook({ ...book, isbn: e.target.value })}
              />
              {/* ISBN Note */}
              <p
                id="isbnNote"
                className={
                  isbnFocused && book.isbn && !isValidBook.isbn
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Enter an ISBN without dashes. <br />
                Example: 9780547928227 <br />
                Current Character Count: {book.isbn.length} <br />
                Must be 10 or 13 numbers. <br />
                The last number may be the letter X for ISBN-10.
              </p>
            </label>

            {/* Publisher */}
            <label htmlFor="publisher">
              Publishing Company:
              {/* Publisher | Validation Icons */}
              <span className={isValidBook.publisher ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={
                  isValidBook.publisher || !book.publisher ? "hide" : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Publisher Field */}
              <input
                type="text"
                id="publisher"
                required
                value={book.publisher}
                placeholder="Enter Publisher..."
                aria-invalid={isValidBook.publisher ? "false" : "true"}
                aria-describedby="publisherNote"
                aria-required="true"
                aria-label="Book Publisher"
                onFocus={() => setPublisherFocused(true)}
                onBlur={() => setPublisherFocused(false)}
                onChange={(e) =>
                  setBook({ ...book, publisher: e.target.value })
                }
              />
              {/* Publisher Note */}
              <p
                id="publisherNote"
                className={
                  publisherFocused && book.publisher && !isValidBook.publisher
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Enter a publisher between 5 and 25 characters. <br />
                Example: Penguin Books <br />
                Current Character Count: {book.publisher.length} <br />
                Must begin with a capitol letter.
              </p>
            </label>

            {/* Publication Year */}
            <label>
              Publication Year:
              {/* Publication Year | Validation Icons */}
              <span className={isValidBook.publicationYear ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={
                  isValidBook.publicationYear || !book.publicationYear
                    ? "hide"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Publication Year Field */}
              <input
                type="number"
                id="publicationYear"
                required
                value={book.publicationYear}
                placeholder="Enter Publication Year..."
                aria-invalid={isValidBook.publicationYear ? "false" : "true"}
                aria-describedby="publicationYearNote"
                aria-required="true"
                aria-label="Book Publication Year"
                min={1900}
                onFocus={() => setPublicationYearFocused(true)}
                onBlur={() => setPublicationYearFocused(false)}
                onChange={(e) =>
                  setBook({ ...book, publicationYear: e.target.value })
                }
              />
              {/* Publication Year Note */}
              <p
                id="publicationYearNote"
                className={
                  publicationYearFocused &&
                  book.publicationYear &&
                  !isValidBook.publicationYear
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Enter a publication year between 1900 and the current year.{" "}
                <br />
                Example: 1937 <br />
                Current Character Count: {book.publicationYear.length}
              </p>
            </label>

            {/* Cover Art */}
            <label htmlFor="coverArt" className="custom-file-label">
              Cover Art:&nbsp;
              <FontAwesomeIcon icon={faUpload} className="faUpload" />
            </label>
            {/* Cover Art Field */}
            <input
              type="file"
              id="coverArt"
              accept="image/*"
              aria-describedby="coverArtNote"
              aria-label="Cover Art"
              onChange={(e) => setBook({ ...book, coverArt: e.target.value })}
              className="custom-file-input"
            />
            {/* Cover Art Note */}
            <p
              id="coverArtNote"
              className={
                book.title && book.author && book.genre && !book.coverArt
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
              Upload an image of the book cover.
            </p>
          </section>

          {/* 2. Reviewer Information */}
          <section className="Reviewer-Information">
            <h3>Reviewer Information</h3>
            {/* Name */}
            <label htmlFor="name">
              Reviewer Name:
              {/* Name | Validation Icons */}
              <span className={isValidReviewer.name ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={
                  isValidReviewer.name || !reviewerInformation.name
                    ? "hide"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Name Field */}
              <input
                type="text"
                id="name"
                required
                value={reviewerInformation.name}
                placeholder="Enter Name..."
                aria-invalid={isValidReviewer.name ? "false" : "true"}
                aria-describedby="nameNote"
                aria-required="true"
                aria-label="Reviewer Name"
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                onChange={(e) =>
                  setReviewerInformation({
                    ...reviewerInformation,
                    name: e.target.value,
                  })
                }
              />
              {/* Name Note */}
              <p
                id="nameNote"
                className={
                  nameFocused &&
                  reviewerInformation.name &&
                  !isValidReviewer.name
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Enter a name between 5 and 25 characters. <br />
                Example: John Smith <br />
                Current Character Count: {reviewerInformation.name.length}{" "}
                <br />
                Must begin with a capitol letter.
              </p>
            </label>

            {/* Email */}
            <label htmlFor="email">
              Reviewer Email:
              {/* Email | Validation Icons */}
              <span className={isValidReviewer.email ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={
                  isValidReviewer.email || !reviewerInformation.email
                    ? "hide"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Email Field */}
              <input
                type="email"
                id="email"
                required
                value={reviewerInformation.email}
                placeholder="Enter Email..."
                aria-invalid={isValidReviewer.email ? "false" : "true"}
                aria-describedby="emailNote"
                aria-required="true"
                aria-label="Reviewer Email"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                onChange={(e) =>
                  setReviewerInformation({
                    ...reviewerInformation,
                    email: e.target.value,
                  })
                }
              />
              {/* Email Note */}
              <p
                id="emailNote"
                className={
                  emailFocused &&
                  reviewerInformation.email &&
                  !isValidReviewer.email
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Enter an email between 5 and 50 characters. <br />
                Example: johnsmith@email.com
              </p>
            </label>

            {/* Review Date */}
            <label htmlFor="reviewDate">
              Review Date:
              {/* Review Date | Validation Icons */}
              <span className={isValidReviewer.reviewDate ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={
                  isValidReviewer.reviewDate || !reviewerInformation.reviewDate
                    ? "hide"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Review Date Field */}
              <input
                type="date"
                id="reviewDate"
                required
                value={reviewerInformation.reviewDate}
                placeholder="Enter Review Date..."
                aria-invalid={isValidReviewer.reviewDate ? "false" : "true"}
                aria-describedby="reviewDateNote"
                aria-required="true"
                aria-label="Reviewer Review Date"
                onFocus={() => setReviewDateFocused(true)}
                onBlur={() => setReviewDateFocused(false)}
                onChange={(e) =>
                  setReviewerInformation({
                    ...reviewerInformation,
                    reviewDate: e.target.value,
                  })
                }
              />
              {/* Review Date Note */}
              <p
                id="reviewDateNote"
                className={
                  reviewDateFocused &&
                  reviewerInformation.reviewDate &&
                  !isValidReviewer.reviewDate
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Enter a review date in the format YYYY-MM-DD. <br />
                Example: 2021-01-01
              </p>
            </label>

            {/* Image */}
            <label htmlFor="image" className="custom-file-label">
              Image:&nbsp;
              <FontAwesomeIcon icon={faUpload} className="faUpload" />
            </label>
            {/* Image Field */}
            <input
              type="file"
              id="image"
              accept="image/*"
              aria-describedby="imageNote"
              aria-label="Reviewer Image"
              onChange={(e) =>
                setReviewerInformation({
                  ...reviewerInformation,
                  image: e.target.value,
                })
              }
              className="custom-file-input"
            />
            {/* Image Note */}
            <p
              id="imageNote"
              className={
                reviewerInformation.name &&
                reviewerInformation.email &&
                reviewerInformation.reviewDate &&
                !reviewerInformation.image
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
              Upload an image of the reviewer.
            </p>
            {/* Image Preview or Placeholder */}
            <div className="reviewer-image">
              {reviewerInformation.image ? (
                <span>
                  <img
                    className="reviewer-image-preview"
                    src={reviewerInformation.image}
                    alt={`${reviewerInformation.name} Profile`}
                  />
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon icon={faUser} className="faUser" />
                </span>
              )}
            </div>
          </section>
        </div>

        {/* Summary & Icons */}
        <div className="summary">
          {/* Cover Art */}
          <div className="cover-art">
            {book.coverArt ? (
              <span>
                <img
                  className="cover-art-preview"
                  src={book.coverArt}
                  alt={`${book.title} Cover Art`}
                />
              </span>
            ) : (
              <span>
                <FontAwesomeIcon icon={faBook} className="faBook" />
              </span>
            )}
          </div>

          {/* 4. Summary */}
          <div className="summary-field">
            <h3>Summary</h3>
            <section id="summary-text">
              {/* Summary Field */}
              <textarea
                id="summary"
                required
                value={summary}
                placeholder="Enter Summary..."
                aria-invalid={isValidSummary ? "false" : "true"}
                aria-describedby="summaryNote"
                aria-required="true"
                aria-label="Book Summary"
                cols={40}
                rows={10}
                onFocus={() => setSummaryFocused(true)}
                onBlur={() => setSummaryFocused(false)}
                onChange={(e) => setSummary(e.target.value)}
                className={textAreaClass(
                  isValidSummary && summary,
                  summaryFocused
                )}
              />
              {/* Summary Note */}
              <p
                id="summaryNote"
                className={!isValidSummary ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                {tab}
                {summary.length} / 300 characters
              </p>
            </section>
          </div>

          {/* Story Games Logo */}
          <div className="story-games-logo">
            <img src={logo} alt="Story Games Logo" />
          </div>
        </div>

        {/* Brief & Analysis */}
        <div className="brief-analysis">
          {/* 3. Brief */}
          <section className="Brief">
            <h3>3. Brief</h3>
            {/* Character & Theme Parent Box */}
            <div className="char-theme-parent">
              {/* Character & Theme Form Fields */}
              <div className="char-theme-fields">
                {/* Characters */}
                <section className="characters">
                  <h4>Add Characters</h4>
                  {/* Character name */}
                  <label htmlFor="characterName">
                    Character Name:
                    {/* Character Name | Validation Icons */}
                    <span
                      className={
                        charNameInput >= 3 && charNameInput <= 25
                          ? "valid"
                          : "hide"
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} className="faCheck" />
                    </span>
                    <span
                      className={
                        (charNameInput >= 3 && charNameInput <= 25) ||
                        !brief.characterName
                          ? "hide"
                          : "invalid"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} className="faTimes" />
                    </span>
                    {/* Character Name Input Field */}
                    <input
                      type="text"
                      id="characterName"
                      value={charNameInput}
                      placeholder="Enter Character Name..."
                      aria-invalid={
                        charNameInput >= 3 && charNameInput <= 25
                          ? "false"
                          : "true"
                      }
                      aria-label="Book Character Name"
                      onChange={(e) => setCharNameInput(e.target.value)}
                    />
                  </label>

                  {/* Character Role */}
                  <label htmlFor="characterRole">
                    Character Role:
                    {/* Character Role | Validation Icons */}
                    <span
                      className={
                        charRoleInput >= 3 && charRoleInput <= 25
                          ? "valid"
                          : "hide"
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} className="faCheck" />
                    </span>
                    <span
                      className={
                        (charRoleInput >= 3 && charRoleInput <= 25) ||
                        !brief.characterRole
                          ? "hide"
                          : "invalid"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} className="faTimes" />
                    </span>
                    {/* Character Role Input Field */}
                    <input
                      type="text"
                      id="characterRole"
                      value={charRoleInput}
                      placeholder="Enter Character Role..."
                      aria-invalid={
                        charRoleInput >= 3 && charRoleInput <= 25
                          ? "false"
                          : "true"
                      }
                      aria-label="Book Character Role"
                      onChange={(e) => setCharRoleInput(e.target.value)}
                    />
                  </label>

                  {/* Character Appearance */}
                  <label htmlFor="characterAppearance">
                    Character Appearance:
                    {/* Character Appearance | Validation Icons */}
                    <span
                      className={
                        charAppInput >= 3 && charAppInput <= 25
                          ? "valid"
                          : "hide"
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} className="faCheck" />
                    </span>
                    <span
                      className={
                        (charAppInput >= 3 && charAppInput <= 25) ||
                        !brief.characterAppearance
                          ? "hide"
                          : "invalid"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} className="faTimes" />
                    </span>
                  </label>
                  {/* Character Appearance Input Field */}
                  <textarea
                    type="text"
                    id="characterAppearance"
                    className={characterNotesClass(
                      charAppInput.length,
                      characterAppearanceFocused,
                      9
                    )}
                    value={charAppInput}
                    placeholder="Enter Character Appearance..."
                    aria-invalid={
                      charAppInput >= 3 && charAppInput <= 25 ? "false" : "true"
                    }
                    aria-label="Book Character Appearance"
                    aria-describedby="characterAppearanceNote"
                    onFocus={() => setCharacterAppearanceFocused(true)}
                    onBlur={() => setCharacterAppearanceFocused(false)}
                    onChange={(e) => setCharAppInput(e.target.value)}
                    cols={30}
                    rows={3}
                  />

                  {/* Character Note */}
                  <label htmlFor="characterNote">Character Note:</label>
                  {/* Character Note Input Field */}
                  <textarea
                    type="text"
                    id="characterNote"
                    className={characterNotesClass(
                      charNotesInput.length,
                      characterNotesFocused
                    )}
                    value={charNotesInput}
                    placeholder="Enter Character Note..."
                    aria-invalid={
                      charNotesInput >= 50 && charNotesInput <= 2500
                        ? "false"
                        : "true"
                    }
                    aria-label="Book Character Note"
                    aria-describedby="characterNote"
                    onFocus={() => setCharacterNotesFocused(true)}
                    onBlur={() => setCharacterNotesFocused(false)}
                    onChange={(e) => setCharNotesInput(e.target.value)}
                    cols={30}
                    rows={5}
                  />
                  {/* Character Note Note */}
                  <p
                    id="characterNote"
                    className={
                      (charNotesInput.length >= 50 &&
                        charNotesInput.length <= 2500) ||
                      !characterNotesFocused
                        ? "hide"
                        : "instructions"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="info-circle"
                    />
                    Enter a character note between 50 and 2500 characters.{" "}
                    <br />
                    Note character's attributes, personality, arc, <br />
                    development, motivations, morality, impact, and
                    relationships.
                  </p>

                  <button
                    type="button"
                    className="add-character"
                    onClick={(e) =>
                      addCharacter(
                        charNameInput,
                        charRoleInput,
                        charAppInput,
                        charNotesInput
                      )
                    }
                  >
                    Add Character
                  </button>
                </section>

                {/* Themes */}
                <section className="themes">
                  {/* Theme */}
                  <label htmlFor="theme">
                    <button
                      type="button"
                      className="add-theme"
                      onClick={(e) => addTheme(currentThemeInput)}
                    >
                      Add Theme
                    </button>
                    {/* Theme Input Field */}
                    <select
                      type="text"
                      id="theme"
                      className={briefThemesClass(
                        brief.themes.length,
                        themesFocused
                      )}
                      value={currentThemeInput}
                      placeholder="Select a Theme..."
                      aria-invalid={
                        currentThemeInput.length >= 3 &&
                        currentThemeInput.length <= 25
                          ? "false"
                          : "true"
                      }
                      aria-label="Book Theme"
                      aria-describedby="themeNote"
                      onFocus={() => setThemesFocused(true)}
                      onBlur={() => setThemesFocused(false)}
                      onChange={(e) => setCurrentThemeInput(e.target.value)}
                    >
                      <option value="">Select a Theme</option>
                      <option value="Love">Love</option>
                      <option value="Identity">Identity</option>
                      <option value="Self-Discipline">Self-Discipline</option>
                      <option value="Coming of Age">Coming of Age</option>
                      <option value="Good vs. Evil">Good vs. Evil</option>
                      <option value="Conflict & Resolution">
                        Conflict & Resolution
                      </option>
                      <option value="Loss & Grief">Loss & Grief</option>
                      <option value="Isolation & Belonging">
                        Isolation & Belonging
                      </option>
                      <option value="Social Justice">Social Justice</option>
                      <option value="Nature and the Environment">
                        Nature and the Environment
                      </option>
                      <option value="Power & Corruption">
                        Power & Corruption
                      </option>
                      <option value="War & Conflict">War & Conflict</option>
                      <option value="Freedom & Oppression">
                        Freedom & Oppression
                      </option>
                      <option value="Technology & Progress">
                        Technology & Progress
                      </option>
                      <option value="Time & Memory">Time & Memory</option>
                      <option value="Hope & Resilience">
                        Hope & Resilience
                      </option>
                      <option value="Adventure & Exploration">
                        Adventure & Exploration
                      </option>
                      <option value="Society & Class">Society & Class</option>
                      <option value="Spirituality & Faith">
                        Spirituality & Faith
                      </option>
                      <option value="Art & Creativity">Art & Creativity</option>
                      <option value="Mortality & Immortality">
                        Mortality & Immortality
                      </option>
                      <option value="Dreams & Aspirations">
                        Dreams & Aspirations
                      </option>
                      <option value="Revenge & Forgiveness">
                        Revenge & Forgiveness
                      </option>
                      <option value="Science & Ethics">Science & Ethics</option>
                      <option value="Cultural Clashes">Cultural Clashes</option>
                      <option value="Family & Legacy">Family & Legacy</option>
                      <option value="Ambition & Greed">Ambition & Greed</option>
                      <option value="Addiction & Recovery">
                        Addiction & Recovery
                      </option>
                      <option value="Obsession">Obsession</option>
                      <option value="Education">Education</option>
                      <option value="Hidden Identity">Hidden Identity</option>
                      <option value="Innocence & Experience">
                        Innocence & Experience
                      </option>
                      <option value="Exploration of Dreams">
                        Exploration of Dreams
                      </option>
                      <option value="The Supernatural">The Supernatural</option>
                      <option value="The Unknown">The Unknown</option>
                    </select>
                    {/* button to add currentTheme to brief themes array */}

                    {/* Theme Note */}
                    <p
                      id="themeNote"
                      className={
                        !currentThemeInput &&
                        themesFocused &&
                        brief.themes?.length < 5
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="info-circle"
                      />
                      Select a theme. <br />
                      Current Selection: {currentThemeInput} <br />
                      Current Themes: {brief.themes?.length} / 5
                    </p>
                  </label>
                </section>
              </div>

              {/* Character & Theme Previews */}
              <div className="char-theme-prevs">
                <section className="characters">
                  <h4>Characters</h4>
                  {/* If character array is empty display placeholder image */}
                  {brief.characters.length > 0 ? (
                    <ul>
                      {/* map through all characters, show name & role in one row & notes umderneath */}
                      {brief.characters.map((character, index) => (
                        <li key={index}>
                          <h5>
                            {character.name} - {character.role}
                          </h5>
                          <p>{character.notes}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>
                      <FontAwesomeIcon
                        icon={faClipboardList}
                        className="faClipBoardList"
                      />
                    </span>
                  )}
                </section>
                <section className="themes">
                  <h4>Themes</h4>
                  {/* If theme array is empty display placeholder image otherwise show list of themes */}
                  {brief.themes.length > 0 ? (
                    <ul>
                      {/* map through all themes and display in list */}
                      {brief.themes.map((theme, index) => (
                        <li key={index}>
                          <h5>{theme}</h5>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      "Themes are recurring or significant topics, subjects, or
                      ideas explored in the book. They often represent the
                      central messages, motifs, and concepts that the author is
                      trying to convey."
                    </p>
                  )}
                </section>
              </div>
            </div>

            {/* Synopsis */}
            <div id="synopsis">
              <label htmlFor="synopsis">
                <h4>Synopsis:</h4>

                {/* Synopsis | Validation Icons */}
                <span className={isValidBrief.synopsis ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} className="faCheck" />
                </span>
                <span
                  className={
                    isValidBrief.synopsis || !brief.synopsis
                      ? "hide"
                      : "invalid"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} className="faTimes" />
                </span>
              </label>
              {/* Synopsis Field */}
              <textarea
                id="synopsis"
                required
                value={brief.synopsis}
                placeholder="Enter Synopsis..."
                aria-invalid={isValidBrief.synopsis ? "false" : "true"}
                aria-describedby="synopsisNote"
                aria-required="true"
                aria-label="Book Synopsis"
                cols={60}
                rows={10}
                onFocus={() => setSynopsisFocused(true)}
                onBlur={() => setSynopsisFocused(false)}
                onChange={(e) =>
                  setBrief({ ...brief, synopsis: e.target.value })
                }
              />
              {/* Synopsis Note */}
              <p
                id="synopsisNote"
                className={
                  synopsisFocused && brief.synopsis && !isValidBrief.synopsis
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Enter a synopsis between 50 and 100 characters. <br />
                Example: The Hobbit is a fantasy novel by J.R.R. Tolkien. <br />
                Current Character Count: {brief.synopsis.length}
              </p>
            </div>
          </section>

          {/* 5. Analysis, Pros & Cons */}
          <section className="Analysis">

            {/* Analysis */}
            <label htmlFor="analysis">
              <h4>Analysis:</h4>
              {/* Analysis | Validation Icons */}
              <span className={isValidAnalysis ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={isValidAnalysis || !analysis ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Analysis Field */}
              <textarea
                id="analysis"
                required
                value={analysis}
                placeholder="Analyze the authors writing style, plot, characters, and themes..."
                aria-invalid={isValidAnalysis ? "false" : "true"}
                aria-describedby="analysisNote"
                aria-required="true"
                aria-label="Book Analysis"
                cols={85}
                rows={10}
                onFocus={() => setAnalysisFocused(true)}
                onBlur={() => setAnalysisFocused(false)}
                onChange={(e) => setAnalysis(e.target.value)}
              />
              {/* Analysis Note */}
              <p
                id="analysisNote"
                className={
                  analysisFocused && analysis && !isValidAnalysis
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
                Enter an analysis between 300 and 5000 characters. <br />
                Please include a minimum of 3 paragraphs. <br />
                Analyze the book's plot, characters, themes, and writing style.{" "}
                <br />
                Current Character Count: {analysis.length}
              </p>
            </label>

            {/* 6. Pros & Cons*/}

            {/* Pros */}
            <label htmlFor="pros">
              Pros:
              {/* Pros | Validation Icons */}
              <span className={isValidPros ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={
                  isValidPros || !prosInput || !pros ? "hide" : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Pros Field */}
              {/* input changes proInput clicking add button adds to the pros array */}
              <input
                type="text"
                id="pros"
                required
                value={prosInput}
                placeholder="Enter a positive bullet point..."
                aria-invalid={isValidPros ? "false" : "true"}
                aria-describedby="prosConsNote"
                aria-required="true"
                aria-label="Book Pros"
                onFocus={() => setProsFocused(true)}
                onBlur={() => setProsFocused(false)}
                onChange={(e) => setProsInput(e.target.value)}
              />
              {/* Add Pros Button */}
              <button
                type="button"
                className="add-pros"
                onClick={() => {
                  setPros([...pros, prosInput]);
                  setProsInput("");
                }}
              >
                Add Pro
              </button>
            </label>
            <br />
            {/* Cons */}
            <label htmlFor="cons">
              Cons:
              {/* Cons | Validation Icons */}
              <span className={isValidCons ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} className="faCheck" />
              </span>
              <span
                className={
                  isValidCons || !consInput || !cons ? "hide" : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} className="faTimes" />
              </span>
              {/* Cons Field */}
              {/* input changes conInput clicking add button adds to the cons array */}
              <input
                type="text"
                id="cons"
                required
                value={consInput}
                placeholder="Enter a negative bullet point..."
                aria-invalid={isValidCons ? "false" : "true"}
                aria-describedby="prosConsNote"
                aria-required="true"
                aria-label="Book Cons"
                onFocus={() => setConsFocused(true)}
                onBlur={() => setConsFocused(false)}
                onChange={(e) => setConsInput(e.target.value)}
              />
              {/* Add Cons Button */}
              <button
                type="button"
                className="add-cons"
                onClick={() => {
                  setCons([...cons, consInput]);
                  setConsInput("");
                }}
              >
                Add Con
              </button>
            </label>

            {/* Pros & Cons Note */}
            <p
              id="prosConsNote"
              className={
                (prosFocused || consFocused) &&
                (pros || cons) &&
                (!isValidPros || !isValidCons)
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
              Enter 3 to 5 pros and cons. <br />
              Current Pros Count: {pros.length} <br />
              Current Cons Count: {cons.length}
            </p>
          </section>
        </div>

        {/* Conclusion: Rating, Recommendation, Additional Notes */}
        <div className="conclusion">
          {/* 7. Rating */}
          <h5>7. Rating</h5>
          {/* Rating */}
          <label htmlFor="rating">
            Rating:
            {/* Rating | Validation Icons */}
            <span className={isValidRating ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} className="faCheck" />
            </span>
            <span className={isValidRating || !rating ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} className="faTimes" />
            </span>
            {/* Rating Field */}
            <div className="rating">
              <span
                className={rating >= "1" ? "selected" : "unselected"}
                onClick={() => setRating("1")}
              >
                {rating >= "1" ? (
                  <FontAwesomeIcon icon={faStar} />
                ) : (
                  <FontAwesomeIcon icon={faStarEmpty} />
                )}
              </span>
              <span
                className={rating >= "2" ? "selected" : "unselected"}
                onClick={() => setRating("2")}
              >
                {rating >= "2" ? (
                  <FontAwesomeIcon icon={faStar} />
                ) : (
                  <FontAwesomeIcon icon={faStarEmpty} />
                )}
              </span>
              <span
                className={rating >= "3" ? "selected" : "unselected"}
                onClick={() => setRating("3")}
              >
                {rating >= "3" ? (
                  <FontAwesomeIcon icon={faStar} />
                ) : (
                  <FontAwesomeIcon icon={faStarEmpty} />
                )}
              </span>
              <span
                className={rating >= "4" ? "selected" : "unselected"}
                onClick={() => setRating("4")}
              >
                {rating >= "4" ? (
                  <FontAwesomeIcon icon={faStar} />
                ) : (
                  <FontAwesomeIcon icon={faStarEmpty} />
                )}
              </span>
              <span
                className={rating >= "5" ? "selected" : "unselected"}
                onClick={() => setRating("5")}
              >
                {rating >= "5" ? (
                  <FontAwesomeIcon icon={faStar} />
                ) : (
                  <FontAwesomeIcon icon={faStarEmpty} />
                )}
              </span>
              &nbsp;
              {/* icon to clear rating */}
              <span className="clear" onClick={() => setRating("")}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
            {/* Rating Note */}
            <p
              id="ratingNote"
              className={
                ratingFocused && rating && !isValidRating
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
              Select a rating by clicking on the stars. <br />
              Or clear the rating by clicking the X. <br />
              The review must have a rating before it can be submitted. <br />
              The rating is currently set to {rating} stars.
            </p>
          </label>

          {/* 8. Recommendation */}
          <h5>8. Recommendation</h5>
          {/* Recommendation | Validation Icons */}
          <span className={isValidRecommendation ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} className="faCheck" />
          </span>
          <span
            className={
              isValidRecommendation || !recommendation ? "hide" : "invalid"
            }
          >
            <FontAwesomeIcon icon={faTimes} className="faTimes" />
          </span>

          {/* Recommendation Field */}
          <input
            type="checkbox"
            id="recommendation"
            required
            value={recommendation}
            name="recommendation"
            aria-invalid={isValidRecommendation ? "false" : "true"}
            aria-describedby="recommendationNote"
            aria-required="true"
            aria-label="Book Recommendation"
            onFocus={() => setRecommendationFocused(true)}
            onBlur={() => setRecommendationFocused(false)}
            onChange={(e) => setRecommendation(e.target.value)}
          />
          <label htmlFor="recommendation">
            {book.title && book.author
              ? `Check if you recommend ${book.title} by ${book.author}`
              : "Check if you recommend this book"}
          </label>

          {/* Recommendation Note */}
          <p
            id="recommendationNote"
            className={
              recommendationFocused && recommendation && !isValidRecommendation
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
            Check the box if this title has your recommendation. <br />
            Current Selection: {recommendation}
          </p>

          {/* Additional Notes */}
          <label htmlFor="additionalNotes">
            Additional Notes:
            {/* Additional Notes | Validation Icons */}
            <span className={isValidAdditionalNotes ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} className="faCheck" />
            </span>
            <span
              className={
                isValidAdditionalNotes || !additionalNotes ? "hide" : "invalid"
              }
            >
              <FontAwesomeIcon icon={faTimes} className="faTimes" />
            </span>
            {/* Additional Notes Field */}
            <textarea
              id="additionalNotes"
              required
              value={additionalNotes}
              placeholder="Enter Additional Notes..."
              aria-invalid={isValidAdditionalNotes ? "false" : "true"}
              aria-describedby="additionalNotesNote"
              aria-required="true"
              aria-label="Book Additional Notes"
              cols={30}
              rows={5}
              onFocus={() => setAdditionalNotesFocused(true)}
              onBlur={() => setAdditionalNotesFocused(false)}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
            {/* Additional Notes Note */}
            <p
              id="additionalNotesNote"
              className={
                additionalNotesFocused &&
                additionalNotes &&
                !isValidAdditionalNotes
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="info-circle" />
              Enter additional notes between 10 and 150 characters. <br />
              Example: This book is a classic. <br />
              Current Character Count: {additionalNotes.length}
            </p>
          </label>
        </div>

        {/* Submit Button */}
        <button disabled={showSubmitButton ? "false" : "true"}>
          Create Review
        </button>
      </form>
    </section>
  );
};

export default BookReviewForm;
