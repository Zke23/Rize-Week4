1. What did you ask Copilot to help you build? How did you break down the problem?

Firstly, I asked Copilot to build a simple html web page designed for social media post. I also asked for the code to be seperated into the respective .html, .css, and .js files. 

![First Prompt/ Asking for barebones](images/Screenshot%202026-09-27%20191818.png)

Soon after, I asked for a more specific feature, which was a user profile interface. I asked for it to sit on the left side of the page next to a generated feed container. 

![Second prompt / More specific feature](images/Screenshot%202026-09-27%20192138.png)

This would be the theme throughout the entire project. I would prompt Copilot with a specific feature, and then, depending on the results, modify the prompt with another for a more suitable fix.

2. How did your approach to asking questions change as you worked?

As I said before, my main approach throughout the project would be to ask for a specific feature/interface, and depending on the result, modify the results with another prompt. As stated in resource #2, the goal is to be specific and iterate/refine. I did that to the best of my ability. For example, the code snippet below is me asking for one of the page's buttons to be interactive in a specific way. Shortly afterwards, I asked for another fix related to the results of that.

![Specific prompt waiting for a modiying follow up](images/Screenshot%202026-09-27%20192803.png)

![Follow up prompt to modify results](images/Screenshot%202026-09-27%20193008.png)

3. What parts of the development process with GitHub Copilot surprised you?

I've never been a prompt/engineer as I've always enjoyed writing my code independently and original. Personally, I've been dismissive towards the use of AI and disregarded its use as laziness. However, that has changed recently. What's shocked me is the sheer power and efficency that is has. A good programmer can turn into an incredible one if he learns how to ultilize AI. Aside from the intial shock of AI's power, nothing else really surprised me. 

4. What did you learn about the technology you used that you didn't know before?

As I've iterated before, I've learned about it's efficiency. Also, I've learned about copilots intergration within VScode. I find it interesting how well they operate within each other. Whenever I send a prompt, the results can be thrown away or kept, which is very useful. I had a couple prompts which were discarded because they didn't reach what I had in mind for the project. 

5. What would you do differently if you had to build this again?

After experimenting with prompting, I realize where I should utilize broad and specific prompts. I know now that I should set boundaries on a specific prompt if I know that it can make unwanted changes to avoid conflict with other areas of the project. For example, If I wanted to add a feature by prompting " Build me a like button and comment section for post", that is very broad. Instead, I should be more specific and ask " Create a single React component named CommentSection. It should accept a prop postID: string and an array of exsisting Comment objects.". This prompt is much more specific and can help avoid conflicting blocks of code. Now, this kind of prompting might require more knowledge of whatever language of code your using. Since I'm not good as js, It would take me a lot longer to prompt like that. Below would be an example of one of my specific prompts for the project. However, it's not as specific as it could be. 

![Broad Prompt](images/Screenshot%202026-09-27%20195125.png)