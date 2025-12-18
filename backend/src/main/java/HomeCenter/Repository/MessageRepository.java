package HomeCenter.Repository;

import HomeCenter.Model.Message;
import HomeCenter.Model.TestTable;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Repository
public class MessageRepository {
    @Autowired
    private NamedParameterJdbcTemplate paramTemplate;

    @Autowired
    JdbcTemplate template;

    private final String TABLE_NAME = "message";

    public void save(Message message){
        String sql = "INSERT INTO " + TABLE_NAME + "(sender, content) VALUES (:sender, :content)";
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("sender", message.getSender())
                .addValue("content", message.getContent());
        paramTemplate.update(sql, namedParameters);
    }

    public List<Message> findAll() {
        String sql = "SELECT * FROM " + TABLE_NAME;
        RowMapper<Message> mapper = (ResultSet rs, int rowNum) -> {
            Message message = new Message();
            message.setId(rs.getLong("id"));
            message.setSender(rs.getString("sender"));
            message.setContent(rs.getString("content"));
            return message;
        };
        return template.query(sql, mapper);
    }

}
