package xyz.paladarpastel.backend.websocket.config;

import java.lang.reflect.Type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class StompController implements StompSessionHandler {
    // hard-coded values

    @Override
    public void afterConnected(
            StompSession session, StompHeaders connectedHeaders) {
        session.send("/app/teste", "enviou msg");
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
    }

    @Override
    public Type getPayloadType(StompHeaders headers) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void handleException(StompSession session, @Nullable StompCommand command, StompHeaders headers,
            byte[] payload, Throwable exception) {
        // TODO Auto-generated method stub

    }

    @Override
    public void handleTransportError(StompSession session, Throwable exception) {
        // TODO Auto-generated method stub

    }
}