import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, orderBy, limit, startAfter, doc, updateDoc, getDoc } from "firebase/firestore";
// @ts-ignore
import { db } from './firebase'; // Import the Firestore instance
import { Button } from './components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Coffee, Pizza, Music, Lightbulb, Send, ThumbsUp, ThumbsDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from 'sweetalert2';

interface Message {
  id: string;
  message: string;
  likes?: number;
  dislikes?: number;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [language, setLanguage] = useState("en");
  const [lastVisible, setLastVisible] = useState<any>(null);
  const advices = [
    "Don't get advice from anyone, yolo!",
    "Come to the third floor at any cost.",
    "I dont know.",
    "I am not an AI.",
    "This is the end of the list :D !"
  ];
  
  useEffect(() => {
    if (language === "hu") {
      Swal.fire({
        title: 'Oops!',
        text: "Sajnos nem tudunk magyarul. Még tanulunk! Ez egyébként nemzetközi iroda, menj el.",
        footer: "Sorry, we can't speak Hungarian. We're still learning! It is international office by the way, go away.",
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        setLanguage("en");
      });
    }
  }, [language]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async (lastDoc: any = null) => {
    try {
      const messagesRef = collection(db, "messages");
      let q = query(messagesRef, orderBy("createdAt", "desc"), limit(5));
      if (lastDoc) {
        q = query(messagesRef, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(5));
      }

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No more messages to load.");
        return;
      }

      const newMessages = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message));
      setMessages((prevMessages) => {
        const existingMessages = new Map(prevMessages.map((msg) => [msg.id, msg]));
        const filteredMessages = newMessages.filter(message => !existingMessages.has(message.id));
        return [...prevMessages, ...filteredMessages];
      });

      if (querySnapshot.docs.length > 0) {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching messages: ", error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to load messages.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleLike = async (messageId: string) => {
    try {
      const messageRef = doc(db, "messages", messageId);
      const messageSnap = await getDoc(messageRef);
      if (messageSnap.exists()) {
        const messageData = messageSnap.data() as { likes?: number };
        await updateDoc(messageRef, {
          likes: (messageData.likes || 0) + 1,
        });
        fetchMessages();
      }
    } catch (error) {
      console.error("Error liking message: ", error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to like message.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleDislike = async (messageId: string) => {
    try {
      const messageRef = doc(db, "messages", messageId);
      const messageSnap = await getDoc(messageRef);
      if (messageSnap.exists()) {
        const messageData = messageSnap.data() as { dislikes?: number };
        await updateDoc(messageRef, {
          dislikes: (messageData.dislikes || 0) + 1,
        });
        fetchMessages();
      }
    } catch (error) {
      console.error("Error disliking message: ", error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to dislike message.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const sortedMessages = [...messages].sort((a, b) => {
    if ((b.likes || 0) - (a.likes || 0) !== 0) return (b.likes || 0) - (a.likes || 0);
    if ((a.dislikes || 0) - (b.dislikes || 0) !== 0) return (a.dislikes || 0) - (b.dislikes || 0);
    return 0;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addDoc(collection(db, "messages"), {
        message: newMessage,
        createdAt: new Date(),
        likes: 0,
        dislikes: 0,
      });
      setNewMessage("");
      fetchMessages();
    }
  };

  const loadMoreMessages = () => {
    fetchMessages(lastVisible);
  };

  const handleAdviceClick = () => {
    const randomAdvice = advices[Math.floor(Math.random() * advices.length)];
    Swal.fire({
      title: 'Advice',
         text: randomAdvice,
         icon: 'info',
         confirmButtonText: 'OK'
       });
     };

     return (
       <>
         <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 p-8">
           <Card className="max-w-3xl mx-auto">
             <CardHeader>
               <div className="flex justify-end mb-4">
                 <Select value={language} onValueChange={setLanguage}>
                   <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Select language" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="en">English</SelectItem>
                     <SelectItem value="hu">Hungarian</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <CardTitle className="text-xl font-extrabold text-center text-purple-800">
                 Real Official and True One and Only
               </CardTitle>
               <CardTitle className="text-5xl font-bold text-center text-purple-700">
                 International Students Office
               </CardTitle>
               <CardTitle className="text-xl font-semibold text-center text-purple-600 mb-4">
                 of The Third Floor Residents
               </CardTitle>
               <Badge className="mx-auto" variant="outline">Room 327</Badge>
               <CardDescription className="text-center mt-4 italic">
                 "Leave a beer in front of the door!"
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="flex items-center">
                   <Globe className="mr-2 text-blue-500" />
                   <span>Serving students from 0.5 countries</span>
                 </div>
                 <div className="flex items-center">
                   <Coffee className="mr-2 text-brown-500" />
                   <span>Fueled by 99% caffeine and alcohol</span>
                 </div>
                 <div className="flex items-center">
                   <Pizza className="mr-2 text-red-500" />
                   <span>Official hamburger consumption zone</span>
                 </div>
                 <div className="flex items-center">
                   <Music className="mr-2 text-green-500" />
                   <span>Silent disco every full moon</span>
                 </div>
               </div>
               <p className="text-center mb-4">
                 Welcome to the most exclusive (and only) international student office on the third floor! 
                 We're here to solve all your problems, or at least pretend to while eating snacks.
               </p>
               <div className="flex justify-center space-x-4 mb-3">
                 <Button variant="outline" onClick={handleAdviceClick}>
                   <Lightbulb className="mr-2" /> Get "Advice"
                 </Button>
               </div>
               <p className="text-xs text-center text-gray-500 mb-4">
                 * Don't get advice from anyone.
                 * You can manipulate the like/dislike shit.
               </p>
               <div className="mb-6">
                 <h3 className="text-lg font-semibold mb-2 text-center">Leave us a message</h3>
                 <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
                   <Textarea
                     placeholder="Leave a message..."
                     value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                     className="flex-grow"
                   />
                   <Button type="submit" size="icon">
                     <Send className="h-4 w-4" />
                   </Button>
                 </form>
                 <div className="space-y-2">
                   {sortedMessages.map((message) => (
                     <Card key={message.id}>
                       <CardContent className="py-2 px-4 text-sm">
                         <div className="flex justify-between items-center">
                           <p>{message.message}</p>
                           <div className="flex items-center space-x-2">
                             <Button onClick={() => handleLike(message.id)} variant="outline">
                               <ThumbsUp className="h-4 w-4 text-blue-500" />
                               <span>{message.likes || 0}</span>
                             </Button>
                             <Button onClick={() => handleDislike(message.id)} variant="outline">
                               <ThumbsDown className="h-4 w-4 text-red-500" />
                               <span>{message.dislikes || 0}</span>
                             </Button>
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   ))}
                 </div>
               </div>
               <CardFooter className="flex justify-center">
                 <Button onClick={loadMoreMessages}>Load More</Button>
               </CardFooter>
             </CardContent>
             <CardFooter className="flex justify-center">
               <p className="text-sm text-center text-gray-600">
                 Office Hours: Whenever we're awake and not in class (so basically never)
               </p>
             </CardFooter>
           </Card>
         </div>
       </>
     );
   }

   export default App;