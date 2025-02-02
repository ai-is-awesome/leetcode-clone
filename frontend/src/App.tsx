import "./App.css";
import { Landing } from "./components/Landing";
import { initializeApp } from "firebase/app";
import { Signin } from "./components/Signin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";
import { Topbar } from "./components/Topbar";
import { Card } from "./components/Card";
import { Leaderboard } from "./components/LeaderBoard";
import { ProblemList } from "./components/ProblemList";

const firebaseConfig = {
  apiKey: "AIzaSyAjjsbl9eSDWSmfrWpFPap2uGuwONZ2N4g",
  authDomain: "leetcode-clone-c39eb.firebaseapp.com",
  projectId: "leetcode-clone-c39eb",
  storageBucket: "leetcode-clone-c39eb.appspot.com",
  messagingSenderId: "66814187798",
  appId: "1:66814187798:web:a6b3702e191448722dd837",
  measurementId: "G-ET5FNB5WCN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
function App() {
  return (
    <RecoilRoot>
      <StoreApp />
    </RecoilRoot>
  );
}

function StoreApp() {
  const [user, setUser] = useRecoilState(userAtom);

  const leaderboardData = [
    { id: 1, icon: "", name: "Siddharth", points: 23 },
    { id: 1, icon: "", name: "Ayush", points: 43 },
    { id: 1, icon: "", name: "KKumar", points: 231 },
    { id: 1, icon: "", name: "FEFE", points: 213 },
    { id: 1, icon: "", name: "Jannat", points: 23 },
    { id: 1, icon: "", name: "Siddharth", points: 34 },
    { id: 1, icon: "", name: "Siddharth", points: 2344 },
  ];

  const problemList = [
    { id: 1, problemName: "Two Sum", tags: ["Array", "Hash Table"] },
    { id: 2, problemName: "Reverse String", tags: ["String"] },
    { id: 3, problemName: "Palindrome Check", tags: ["String"] },
    { id: 4, problemName: "Merge Intervals", tags: ["Array", "Sorting"] },
    { id: 5, problemName: "Linked List Cycle", tags: ["Linked List"] },
    { id: 6, problemName: "Binary Search", tags: ["Array"] },
    { id: 7, problemName: "Tree Traversal", tags: ["Tree"] },
    { id: 8, problemName: "Graph Connectivity", tags: ["Graph"] },
    {
      id: 9,
      problemName: "Dynamic Programming",
      tags: ["Dynamic Programming"],
    },
    { id: 10, problemName: "Breadth-First Search", tags: ["Graph"] },
  ];

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user && user.email) {
        setUser({
          loading: false,
          user: {
            email: user.email,
          },
        });
      } else {
        setUser({
          loading: false,
        });
        // No user is signed in.
        console.log("There is no logged in user");
      }
    });
  }, []);

  if (user.loading) {
    return <div>loading ...</div>;
  }

  if (!user.user) {
    return (
      <div>
        <Signin />
      </div>
    );
  }

  return (
    <div className="place-items-center grid">
      <div className="max-w-screen-lg w-full">
        <Topbar />
        {/* <Leaderboard leaderboard={leaderboardData} /> */}
        <ProblemList problemList={problemList} />
      </div>
    </div>
  );
}

export default App;
