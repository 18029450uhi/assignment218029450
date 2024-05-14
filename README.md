# Assignment 3 for WAD 1
## Introduction 
The web application development project is a React web application hosted on firebase, featuring live chat support, FAQ section with fixes and hinting using overall response percentages. The live chat feature supports user get quick answers to their queries and issues from the admin. The question help feature now includes an overall percentage,indicating the popularity of each answer option based on user responses, enhancing decision-making with collective feedback. The app has fully functional authentication login process which gives access to Question page. As users navigate through the video section, any associated FAQs are seamlessly integrated, providing additional context and answers alongside the relevant videos for problem-solving and user support.The data are stored in firebase. The component model of the React app ensures that different parts of the website work together smoothly.
![alt text](image-1.png)
Figure 1 : High level architecture diagram for Web Application


## Installation instructions 
 **Install Dependencies**:
## Prerequisites

Before getting started, Git must be installed. It can be downloaded and installed from [here](https://git-scm.com/).

## Getting Started

1. **Clone the Repository** 

    <p>git clone https://github.com/18029450uhi/assignment218029450.git </p>

2. **Install Dependencies**
 - cd /repository
 - npm install
 - Install Node.js if already not installed.
3. **Start the Development Server**
     In the terminal run  npm start.

4. **Open the Application**
     Visit `http://localhost:3000` in the web browser.

### Methodology

#### Technologies Used:

 Several technologies were utilized to build  this project :

- **React.js**:  React.js was chosen for component-based architecture, reusable UI components and increased code organization and maintainability.

- **React Bootstrap**: The pre-designed UI components and responsive layout features allowed for the rapid development of a visually appealing and user-friendly interface.

- **Firebase Realtime Database**: Firebase Realtime Database used as backend service for storing and retrieving data in real-time. 

- **Firebase Storage**: It is used for storing the  image folder and other images.

- **Firestore Database**: This used for storing and retrieving user data and chat messages. 

- **Firebase Authentication**: It was implemented to handle user authentication and authorization. It provided secure and scalable authentication services.

- **JavaScript/ES6**: Extensively utilized for application logic and feature implementation due to modern syntax and powerful capabilities.

- **HTML/CSS**: Employed for structuring web pages and styling UI, offering foundation for visually appealing and responsive layouts.

#### Planned Features:

The project primarily focused on implementing three key features.
1. **Live Chat Support**: Real-time communication   with admin, including timestamps.

2. **FAQ Section with Fixes**: Develop an FAQ section where users can find answers to frequent questions and reported issues. Include fixes such as videos, images, or text for easy reference.

3. **Overall Percentage Hinting**: Displays response percentages for each answer option.


#### Feature Breakdown: 
**1**. **Live Chat Support**:

   **Tickets**:   
      The live chat feature starts with this ticket:    

      Add a Messages.js Modal: add the Messages.js in src\components\modals\Messages.js. this modal is called in the ProfileButton.js component. check if it's called properly.	
      Then it goes as follows:

![alt text](image-2.png)
Figure 2 : Firebase integration  for chat feature

![alt text](image-4.png)
Figure 3: Components creation

![alt text](image-5.png)
Figure 4 : Chat window feature 

![alt text](image-6.png)
Figure 5: Sendmessage.js update

![alt text](image-7.png)
Figure 6: Further modification 

![alt text](image-8.png)
Figure 7: Chat window update 

![alt text](image-9.png)
Figure 8: Feature modification

![alt text](image-10.png)
Figure 9: Testing ticket

The above screenshot shows the development approach of the live chat feature.

- **Implementation Details**:  
    The user in the live chat can send message directly to the admin. Timestamp is shown. both the admin and the user can send files to the chat. Firestore is used for real-time user list and messaging. 

![alt text](image-11.png)
Figure 10: Live Chat feature Diagram.

- **Screenshots**: 

![alt text](image-12.png)
Figure 11: User chat window

![alt text](image-13.png)
Figure 12: Admin chat window

![alt text](image-14.png)
Figure 13: File selection feature for admin.

- **Remaining Tasks**:  
 The required functionality   of the live chat feature is implemented. The timestamp can be modified to show the exact time and date.

**2**. **FAQ Section with Fixes**:

**Tickets**:   
    
 The first ticket is for this feature is  
 Ticket 1 : FAQButton Component Integration with Firebase in Messages.js : 1) Integrate the FAQButton component with Firebase to fetch and display frequently asked questions related to specific messages.  2) Implement Firebase queries to retrieve FAQ data from the Firebase database and display them within the FAQButton component as needed.

Then this ticket :   

Update FaqButton.js : 1)Implement a function to fetch FAQ data from the Firebase Realtime Database. 2 )Create a database reference to the FAQ data. Retrieve data from the database reference using Firebase's get method.

The subsequent tickets are given below:  

![alt text](image-15.png)
Figure 14: Further tickets

![alt text](image-16.png)
Figure 15: FAQ modal rendering

![alt text](image-17.png)
Figure 16: Working on FaqModal.js 

![alt text](image-18.png)
Figure 17: Final tickets

All the tickets show how the FAQ feature was approached.  

- **Implementation Details**:  
Designed and Implemented FAQ section with fixes (videos, images, text) at timestamps. FAQ Button.js manages modal visibility, fetching data from Firebase Realtime Database. Modal updates Firebase and Firestore when adding FAQ message.  

![alt text](image-19.png)
Figure 18 : FAQ Feature Diagram  

- **Screenshots**:  

![alt text](image-20.png)
Figure 19: Admin view of FAQ section 

![alt text](image-21.png)
Figure 20: User view of FAQ section with confused button  

![alt text](image-22.png)
Figure 21: Add to FAQ’s Button visible on Admin chat 

![alt text](image-23.png)
Figure 22: User query indicating specific section heading  

![alt text](image-24.png)
Figure 23: Admin’s option to add answer to specific hints video


- **Remaining Tasks**:  
The FAQ section has been added to the Hints Section as mentioned in the requirement. This functionality gives the admin ability to add the FAQ in particular video.



