const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground"); //importingd the DB Schema
const Review = require("../models/review");
const { campgroundSchema, reviewSchema } = require("../schemas");
const reviews = require("../controllers/reviews");

const { isLoggedIn, isAuthor, validateReview } = require("../middleware");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", catchAsync(reviews.deleteReview));

module.exports = router;
