import { json } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import EventCard from "../components/EventCard";
import mongoose from "mongoose";
import { useState } from "react";
import { Form } from "@remix-run/react";
import { useEffect } from "react";


export async function loader({ request }) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search); // get the search query from the URL
    const searchQuery = searchParams.get('search') || '';

    let query = {};

    // If there is a search query, we will search for events that match the query
    if (searchQuery) {
        query = {
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { date: { $regex: searchQuery, $options: 'i' } },
                { location: { $regex: searchQuery, $options: 'i' } },
            ]
        };
    }

    const events = await mongoose.models.Event
        .find(query)
        .populate("user")
        .sort({ createdAt: -1 })
        .exec();

    return json({ events });
}

export default function Index() {
    const { events } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || ''; 
  
    // Add a new state variable for loading state
    const [isLoading, setIsLoading] = useState(false);
  
    // This function will handle the search form submission
    const handleSearch = (event) => {
        event.preventDefault();

        const searchValue = event.target.elements.search.value;

        // Only set loading state to true if the search string is not empty
        if (searchValue.trim() !== '') {
            setIsLoading(true);
        }
        setSearchParams({ search: searchValue });
    };

    // This function will handle the change of the input field
    const handleInputChange = (event) => {
        const searchValue = event.target.value;

        // Only set loading state to true if the search string is not empty
        if (searchValue.trim() !== '') {
            setIsLoading(true);
        }
        setSearchParams({ search: searchValue });
    };
    
    // Listen for changes in searchQuery
    useEffect(() => {
        setIsLoading(false);
    }, [searchQuery]);

    return (
        <div className="page page1">
        <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1554998171-89445e31c52b?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero" />
            <div className="hero-text">
                <h1>Cooking Events</h1>
                <p>Embark on a flavorful adventure as we travel the world through its diverse cuisines. From spicy Thai curries to hearty Italian pastas, join us in creating culinary delights from every corner of the globe.</p>
            </div>
        </div>
        <div className="page">

            <Form onSubmit={handleSearch}>
                <div className="searchbar-container">
                    <div style={{ position: 'relative' }}>
                        <input 
                            className={`searchbar ${isLoading ? "loading" : ""}`} 
                            type="text" 
                            name="search" 
                            defaultValue={searchQuery} 
                            placeholder="Search events..."
                            onChange={handleInputChange}
                        />
                        <div id="search-spinner" aria-hidden hidden={!isLoading} />
                    </div>
                    <button type="submit" className="btn-search">Search</button>
                </div>
            </Form>
            <section className="grid">
                {events.map(event => (
                    <Link key={event._id} className="event-link" to={`${event._id}`}>
                        <EventCard event={event} />
                    </Link>
                ))}
            </section>

            </div>
        </div>
    );
}