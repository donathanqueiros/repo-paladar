package xyz.paladarpastel.backend.domain.services.pedido;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.converter.CompositeMessageConverter;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import xyz.paladarpastel.backend.api.mapper.PedidoMapper;
import xyz.paladarpastel.backend.domain.model.pedido.Pedido;
import xyz.paladarpastel.backend.websocket.config.StompController;

@Service
public class NotificacaoService {

    @Autowired
    private PedidoMapper pedidoMapper;

    public void notificarPedidoConfirmado(Pedido pedido) throws InterruptedException, ExecutionException {

        WebSocketClient client = new StandardWebSocketClient();

        WebSocketStompClient stompClient = new WebSocketStompClient(client);

        List<MessageConverter> converters = new ArrayList<MessageConverter>();

        converters.add(new StringMessageConverter());
        converters.add(new MappingJackson2MessageConverter());

        stompClient.setMessageConverter(new CompositeMessageConverter(converters));

        StompSessionHandler sessionHandler = new StompController();
        var session = stompClient.connect("ws://localhost:8080/admin", sessionHandler).get();

        session.send("/app/pedidos", pedidoMapper.toDTO(pedido));

    }

}
