package HomeCenter.Api;

import HomeCenter.Model.Message;
import HomeCenter.Model.TestTable;
import HomeCenter.Repository.MessageRepository;
import HomeCenter.Repository.TestTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MessageApi {

    @Autowired
    MessageRepository messageRepository;

    @PostMapping("/send")
    public void sendMessage(@RequestBody Message message) {
        messageRepository.save(message);
    }

    @GetMapping("/messages")
    public List<Message> getMessages() {
        return messageRepository.findAll();
    }

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message sendMessageStomp(Message message) {
        messageRepository.save(message);
        return message;
    }
}
