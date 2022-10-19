package xyz.paladarpastel.backend.websocket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import xyz.paladarpastel.backend.api.mapper.PedidoMapper;
import xyz.paladarpastel.backend.api.model.dto.pedido.PedidoDTO;

@Controller
public class NotificationControler {

    @Autowired
    private PedidoMapper pedidoMapper;

    @MessageMapping("/pedidos")
    @SendTo("/topic/pedidos")
    public PedidoDTO send(PedidoDTO pedidoDTO) {
        return pedidoDTO;
    }

}
