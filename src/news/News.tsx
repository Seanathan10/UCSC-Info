import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar as MobileTopBar } from "../components/navbar/mobile/TopBar";
import { TopBar as DesktopTopBar } from "../components/navbar/desktop/TopBar";
import "./News.css";
import {Error} from "../Loading";
import { BASE_API_URL } from "../constants";

type FeedItem = {
  title: string;
  link: string;
  published: string;
  summary: string;
};

const FEEDS = [
  { name: "Campus News", key: "press_releases", url: "campus-news" },
  { name: "Arts & Culture", key: "engineering", url: "arts-culture" },
  { name: "Climate & Sustainability",
    key: "applied_math_stats",
    url: "climate-sustainability",
  },
  {
    name: "Earth & Space",
    key: "biomolecular_engineering",
    url: "earth-space",
  },
  {
    name: "Health",
    key: "computer_engineering",
    url: "health",
  },
  {
    name: "Social Justice & Community",
    key: "computer_science",
    url: "social-justice-community",
  },
  {
    name: "Student Experience",
    key: "electrical_engineering",
    url: "student-experience",
  },
  {
    name: "Technology",
    key: "tech_info_mgmt",
    url: "technology",
  },
  {
    name: "Baskin Undergrad Newsletter",
    key: "tech_info_mgmt1",
    url: "newsletter",
  },
  {
    name: "Baskin Community News",
    key: "tech_info_mgmt2",
    url: "be-news",
  },
];

const RssFeed = () => {
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>(() => {
    const storedFeeds = localStorage.getItem("selectedFeeds");
    if (storedFeeds) {
      return JSON.parse(storedFeeds);
    }
    return FEEDS.map((feed) => feed.key); // Default to all feeds selected'
  });

  const [items, setItems] = useState<FeedItem[]>([]);
  const mediaQueryMobile = useMediaQuery("(max-width: 600px)");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const toggleFeed = (key: string) => {
    const selected = selectedFeeds.includes(key) ? selectedFeeds.filter((k) => k !== key) : [...selectedFeeds, key]
    // setSelectedFeeds((prev) =>
    //   prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    // );
    setSelectedFeeds(selected);
    localStorage.setItem("selectedFeeds", JSON.stringify(selected));
  };

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchFeeds = async () => {
      if (selectedFeeds.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          FEEDS.filter((f) => selectedFeeds.includes(f.key)).map((feed) =>
            fetch(`${BASE_API_URL}/rss/${feed.url}`).then((res) => res.json())
          )
        );

        const allItems: FeedItem[] = [].concat(...results);
        allItems.sort(
          (a, b) =>
            new Date(b.published).getTime() - new Date(a.published).getTime()
        );

        setItems(allItems);
		console.log(allItems)
      } catch (error) {
        setError(true);
        console.error("Failed to fetch feeds:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeeds();
  }, [selectedFeeds]);

  return (
    <>
      {mediaQueryMobile ? <MobileTopBar /> : <DesktopTopBar />}

      <div className="RssFeedMain">
        <div className="SideBar">
          <h2>Categories</h2>
          {FEEDS.map((feed) => (
            <div key={feed.key} className="IndividualCheckBox">
              <label>
                <input
                  type="checkbox"
                  checked={selectedFeeds.includes(feed.key)}
                  onChange={() => toggleFeed(feed.key)}
                />
                {feed.name}
              </label>
            </div>
          ))}
        </div>

        
        {error ? <Error>Error Loading News</Error> :
        <div className="RSS_Feed">
        <h1>UCSC News</h1>
          {loading && <div style={{fontSize: 20, margin: 0, padding: 0}}>Loading...</div>}
          {items.map((item, i) => (
            <div
              key={i}
              className="RSS_FeedItem"
              style={{ "--delay": `${i * 115}ms` } as React.CSSProperties}
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <p className="date">
				{item.published}
                {/* {new Date(item.published).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })} */}
              </p>
              {/* <div dangerouslySetInnerHTML={{ __html: item.summary }} /> */}
			  <p>
				{item.summary}
			  </p>
            </div>
          ))}
        </div>}
      </div>
    </>
  );
};

export default RssFeed;
