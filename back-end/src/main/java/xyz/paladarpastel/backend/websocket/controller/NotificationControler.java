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

    @MessageMapping("/pedidos")
    @SendTo("/topic/pedidos")
    public PedidoDTO send(PedidoDTO pedidoDTO) {
        System.out.println();
        return pedidoDTO;
    }
    @MessageMapping("/teste")
    @SendTo("/topic/teste")
    public String send(String valor) {
        System.out.println(valor);
        return valor;
    }

}
